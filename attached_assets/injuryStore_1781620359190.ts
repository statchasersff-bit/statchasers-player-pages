/**
 * injuryStore — read-through cache around the source scraper.
 *
 * Policy (all four matter):
 *   - Freshness window: a stored row is served directly for FRESH_MS.
 *   - Single-flight: concurrent refreshes of the same player collapse to 1 scrape.
 *   - Lazy population: first view of a missing/stale player triggers the scrape;
 *     there is NO full-roster crawl, so cost scales with traffic, not roster size.
 *   - Last-known-good: a failed scrape never overwrites a good row with null; we
 *     fall back to stale data rather than blanking the tab.
 *
 * Storage is abstracted behind InjuryStorage so this file has no DB dependency.
 * A working in-memory implementation is included; swap in your DB (the commented
 * Drizzle sketch shows the shape) for persistence across restarts.
 */
import { fetchPlayerInjuryHistory, rosterAuditSlug, type PlayerInjuryHistory } from "./injurySource";

// Source updates ~daily; a week keeps us current without re-scraping constantly.
const FRESH_MS = 7 * 24 * 60 * 60 * 1000;

export interface StoredInjuryRow {
  data: PlayerInjuryHistory;
  fetchedAt: Date | null;
}

/** Persistence port. Implement against your DB; in-memory default below. */
export interface InjuryStorage {
  get(sleeperId: string): Promise<StoredInjuryRow | null>;
  upsert(sleeperId: string, name: string, data: PlayerInjuryHistory, fetchedAt: Date): Promise<void>;
}

/** Default in-memory store — fine for dev / single instance; not durable. */
export function createInMemoryStorage(): InjuryStorage {
  const map = new Map<string, StoredInjuryRow>();
  return {
    async get(id) {
      return map.get(id) ?? null;
    },
    async upsert(id, _name, data, fetchedAt) {
      map.set(id, { data, fetchedAt });
    },
  };
}

/*
 * Drizzle sketch for a persistent store (one row per player). The denormalized
 * columns let you query/sort players by durability without rehydrating JSON:
 *
 *   async get(id) {
 *     const [row] = await db.select().from(playerInjuries)
 *       .where(eq(playerInjuries.sleeperPlayerId, id)).limit(1);
 *     return row ? { data: row.data, fetchedAt: row.fetchedAt } : null;
 *   },
 *   async upsert(id, name, data, fetchedAt) {
 *     await db.insert(playerInjuries).values({
 *       sleeperPlayerId: id, playerName: name, slug: rosterAuditSlug(name),
 *       grade: data.grade, score: data.score, gradeColor: data.gradeColor,
 *       nflCount: data.nfl.length, collegeCount: data.college.length,
 *       data, source: "rosteraudit", fetchedAt, updatedAt: fetchedAt,
 *     }).onConflictDoUpdate({ target: playerInjuries.sleeperPlayerId, set: { ...same, fetchedAt } });
 *   }
 */

export function createInjuryService(storage: InjuryStorage) {
  // Single-flight: one in-flight scrape per player id.
  const inflight = new Map<string, Promise<PlayerInjuryHistory | null>>();

  /** Scrape + upsert. Returns fresh payload, or null when not found / scrape fails.
   *  Never overwrites an existing row with null (keeps last-known-good). */
  async function refresh(name: string, sleeperId: string): Promise<PlayerInjuryHistory | null> {
    const existing = inflight.get(sleeperId);
    if (existing) return existing;

    const work = (async () => {
      const data = await fetchPlayerInjuryHistory(name, sleeperId);
      if (!data) return null;
      await storage.upsert(sleeperId, name, data, new Date());
      return data;
    })().finally(() => inflight.delete(sleeperId));

    inflight.set(sleeperId, work);
    return work;
  }

  /** Read-through accessor used by the API route. A throw from storage or the
   *  scraper never breaks the caller — worst case is `null`. */
  async function getPlayerInjuryHistory(name: string, sleeperId: string): Promise<PlayerInjuryHistory | null> {
    let stored: StoredInjuryRow | null = null;
    try {
      stored = await storage.get(sleeperId);
    } catch (err: any) {
      console.error("[Injuries] read failed:", err?.message ?? err);
    }

    const fresh = stored?.fetchedAt != null && Date.now() - stored.fetchedAt.getTime() < FRESH_MS;
    if (stored && fresh) return stored.data; // fast path

    try {
      const refreshed = await refresh(name, sleeperId);
      if (refreshed) return refreshed;
    } catch (err: any) {
      console.error("[Injuries] refresh failed:", err?.message ?? err);
    }

    return stored?.data ?? null; // serve stale on scrape failure, else nothing
  }

  return { getPlayerInjuryHistory, refresh };
}

export { rosterAuditSlug };
