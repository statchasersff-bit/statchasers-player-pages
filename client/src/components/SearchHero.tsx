import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Keyboard } from "lucide-react";

/**
 * SearchHero — the persistent "Search any player…" header with the Fantasy
 * Starters count, QB/RB/WR/TE breakdown, and AFC/NFC tabs.
 *
 * It is fully self-contained (fetches its own data, owns its own search +
 * autocomplete state) so it can be dropped onto any page — including player
 * profile pages — and always works. The position pills and conference tabs
 * navigate to the search page (/nfl/players) with the selection applied.
 *
 * The search page itself keeps its own inline control bar (which also drives
 * on-page filtering); this component is for everywhere else.
 */

type LightPlayer = {
  id: string;
  name: string;
  slug: string;
  team: string;
  position: string;
};

type IndexedPlayer = LightPlayer & {
  rank_label?: string;
};

type IndexedData = {
  slugs: string[];
  byTeam: Record<string, Record<string, IndexedPlayer[]>>;
};

const POSITION_ORDER = ["QB", "RB", "WR", "TE"];

// Small headshot for autocomplete rows. Falls back to the position placeholder
// if the player has no image on the Sleeper CDN.
function AutocompleteAvatar({ playerId, position, team }: { playerId: string; position: string; team: string }) {
  const [failed, setFailed] = useState(false);
  const teamLogo = team ? (
    <img
      src={`https://sleepercdn.com/images/team_logos/nfl/${team.toLowerCase()}.png`}
      alt=""
      loading="lazy"
      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 object-contain"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  ) : null;
  if (failed || !playerId) {
    return (
      <div className="relative flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center overflow-visible">
        <span className="text-[10px] font-bold text-muted-foreground">{position || "?"}</span>
        {teamLogo}
      </div>
    );
  }
  return (
    <div className="relative flex-shrink-0 w-8 h-8">
      <img
        src={`https://sleepercdn.com/content/nfl/players/thumb/${playerId}.jpg`}
        alt=""
        loading="lazy"
        className="w-full h-full rounded-md bg-muted object-cover object-top"
        onError={() => setFailed(true)}
      />
      {teamLogo}
    </div>
  );
}

const POSITION_COLORS: Record<string, string> = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def",
};

export default function SearchHero({ scoringControl }: { scoringControl?: React.ReactNode } = {}) {
  const [search, setSearch] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const { data: players } = useQuery<LightPlayer[]>({
    queryKey: ["/api/players"],
  });
  const { data: indexedData } = useQuery<IndexedData>({
    queryKey: ["/api/indexed-players"],
  });

  const indexedFlat = useMemo(() => {
    if (!indexedData?.byTeam) return [] as IndexedPlayer[];
    const all: IndexedPlayer[] = [];
    for (const teamPositions of Object.values(indexedData.byTeam)) {
      for (const [pos, posPlayers] of Object.entries(teamPositions)) {
        // Search covers skill positions only — exclude kickers and defenses.
        if (!POSITION_ORDER.includes(pos)) continue;
        all.push(...posPlayers);
      }
    }
    return all;
  }, [indexedData]);

  const posCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const pos of POSITION_ORDER) {
      counts[pos] = indexedFlat.filter((p) => p.position === pos).length;
    }
    return counts;
  }, [indexedFlat]);

  const autocompleteResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase().trim();
    const indexedMatches = indexedFlat
      .filter((p) => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q))
      .slice(0, 8);
    if (indexedMatches.length >= 4) return indexedMatches;
    const indexedSlugs = new Set(indexedMatches.map((p) => p.slug));
    const extras = (players || [])
      .filter(
        (p) =>
          POSITION_ORDER.includes(p.position) &&
          !indexedSlugs.has(p.slug) &&
          (p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)),
      )
      .slice(0, 8 - indexedMatches.length);
    return [...indexedMatches, ...extras];
  }, [indexedFlat, players, search]);

  // Count only the positions we expose as pills (QB/RB/WR/TE) so the total
  // reconciles with the per-position breakdown. K/DEF stay searchable but are
  // excluded from this headline count.
  const totalPlayers = useMemo(
    () => POSITION_ORDER.reduce((sum, pos) => sum + (posCounts[pos] || 0), 0),
    [posCounts],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [search]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      if (item) item.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleGlobalKey);
    return () => document.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showAutocomplete || autocompleteResults.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < autocompleteResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : autocompleteResults.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const player = autocompleteResults[activeIndex];
        setShowAutocomplete(false);
        navigate(`/nfl/players/${player.slug}/`);
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
    },
    [showAutocomplete, autocompleteResults, activeIndex, navigate],
  );

  return (
    <div className="sc-header" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="sc-utilbar" ref={searchRef}>
          {/* Top row — search owns the full width */}
          <div className="sc-utilbar__search-row">
            <div className="sc-utilbar__search relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search any player, team, or position..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowAutocomplete(true);
                }}
                onFocus={() => {
                  if (search.trim()) setShowAutocomplete(true);
                }}
                onKeyDown={handleKeyDown}
                className="sc-search"
                autoComplete="off"
                role="combobox"
                aria-expanded={showAutocomplete && autocompleteResults.length > 0}
                aria-controls="autocomplete-list"
                aria-activedescendant={activeIndex >= 0 ? `autocomplete-item-${activeIndex}` : undefined}
                data-testid="input-player-search"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <kbd className="sc-search__kbd">
                  <Keyboard className="w-2.5 h-2.5" />/
                </kbd>
              </div>

              {showAutocomplete && search.trim() && autocompleteResults.length > 0 && (
                <div
                  id="autocomplete-list"
                  ref={listRef}
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto"
                  data-testid="autocomplete-dropdown"
                >
                  {autocompleteResults.map((player, i) => (
                    <Link key={player.id} href={`/nfl/players/${player.slug}/`}>
                      <div
                        id={`autocomplete-item-${i}`}
                        role="option"
                        aria-selected={i === activeIndex}
                        className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                          i === activeIndex ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => setShowAutocomplete(false)}
                        data-testid={`autocomplete-item-${player.slug}`}
                      >
                        <AutocompleteAvatar playerId={player.id} position={player.position || ""} team={player.team || ""} />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm text-foreground truncate block">
                            {player.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={POSITION_COLORS[player.position || ""] || ""}>
                              {player.position}
                            </span>
                            <span className="text-xs text-muted-foreground">{player.team}</span>
                          </div>
                        </div>
                        <TrendingUp className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Second row — position filters (left) + conference & scoring (right),
              one unified filter system. */}
          <div className="sc-utilbar__row">
            <div className="sc-utilbar__filters">
              {POSITION_ORDER.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  className="sc-filter-pill"
                  onClick={() => navigate(`/nfl/players?pos=${pos}`)}
                  data-testid={`button-filter-${pos}`}
                >
                  {pos}
                  {posCounts[pos] ? <span className="sc-filter-pill__count">{posCounts[pos]}</span> : null}
                </button>
              ))}
              {totalPlayers > 0 && (
                <span className="sc-utilbar__count" data-testid="badge-player-count">{totalPlayers} players</span>
              )}
            </div>

            <div className="sc-utilbar__group">
              <div className="sc-segment" role="group" aria-label="Conference filter" data-testid="tabs-conference">
                {(["AFC", "NFC"] as const).map((conf) => (
                  <button
                    key={conf}
                    type="button"
                    className="sc-segment__btn"
                    onClick={() => navigate(`/nfl/players?conf=${conf}`)}
                    data-testid={`tab-${conf.toLowerCase()}`}
                  >
                    {conf}
                  </button>
                ))}
              </div>
              {scoringControl}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
