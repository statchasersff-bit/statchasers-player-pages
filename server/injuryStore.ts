import { fetchPlayerInjuryHistory, rosterAuditSlug, type PlayerInjuryHistory } from "./injurySource";

const FRESH_MS = 7 * 24 * 60 * 60 * 1000;

export interface StoredInjuryRow {
  data: PlayerInjuryHistory;
  fetchedAt: Date | null;
}

export interface InjuryStorage {
  get(sleeperId: string): Promise<StoredInjuryRow | null>;
  upsert(sleeperId: string, name: string, data: PlayerInjuryHistory, fetchedAt: Date): Promise<void>;
}

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

export function createInjuryService(storage: InjuryStorage) {
  const inflight = new Map<string, Promise<PlayerInjuryHistory | null>>();

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

  async function getPlayerInjuryHistory(name: string, sleeperId: string): Promise<PlayerInjuryHistory | null> {
    let stored: StoredInjuryRow | null = null;
    try {
      stored = await storage.get(sleeperId);
    } catch (err: any) {
      console.error("[Injuries] read failed:", err?.message ?? err);
    }

    const fresh = stored?.fetchedAt != null && Date.now() - stored.fetchedAt.getTime() < FRESH_MS;
    if (stored && fresh) return stored.data;

    try {
      const refreshed = await refresh(name, sleeperId);
      if (refreshed) return refreshed;
    } catch (err: any) {
      console.error("[Injuries] refresh failed:", err?.message ?? err);
    }

    return stored?.data ?? null;
  }

  return { getPlayerInjuryHistory, refresh };
}

export { rosterAuditSlug };
