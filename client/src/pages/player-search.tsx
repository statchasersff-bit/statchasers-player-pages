import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  TrendingUp,
  Keyboard,
  Activity,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";

type LightPlayer = {
  id: string;
  name: string;
  slug: string;
  team: string;
  position: string;
};

type IndexedPlayer = {
  id: string;
  name: string;
  slug: string;
  team: string;
  position: string;
  rank_label: string;
  depth_chart_order: number | null;
  years_exp: number | null;
  status: string | null;
};

type IndexedData = {
  slugs: string[];
  byTeam: Record<string, Record<string, IndexedPlayer[]>>;
};

const POSITION_COLORS: Record<string, string> = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def",
};

const TEAM_COLORS: Record<string, string> = {
  ARI: "#97233F", ATL: "#A71930", BAL: "#241773", BUF: "#00338D",
  CAR: "#0085CA", CHI: "#0B162A", CIN: "#FB4F14", CLE: "#311D00",
  DAL: "#003594", DEN: "#FB4F14", DET: "#0076B6", GB: "#203731",
  HOU: "#03202F", IND: "#002C5F", JAX: "#006778", KC: "#E31837",
  LAC: "#0080C6", LAR: "#003594", LV: "#A5ACAF", MIA: "#008E97",
  MIN: "#4F2683", NE: "#002244", NO: "#D3BC8D", NYG: "#0B2265",
  NYJ: "#125740", PHI: "#004C54", PIT: "#FFB612", SEA: "#002244",
  SF: "#AA0000", TB: "#D50A0A", TEN: "#0C2340", WAS: "#5A1414",
};

const TEAM_FULL_NAMES: Record<string, string> = {
  ARI: "Cardinals", ATL: "Falcons", BAL: "Ravens", BUF: "Bills",
  CAR: "Panthers", CHI: "Bears", CIN: "Bengals", CLE: "Browns",
  DAL: "Cowboys", DEN: "Broncos", DET: "Lions", GB: "Packers",
  HOU: "Texans", IND: "Colts", JAX: "Jaguars", KC: "Chiefs",
  LAC: "Chargers", LAR: "Rams", LV: "Raiders", MIA: "Dolphins",
  MIN: "Vikings", NE: "Patriots", NO: "Saints", NYG: "Giants",
  NYJ: "Jets", PHI: "Eagles", PIT: "Steelers", SEA: "Seahawks",
  SF: "49ers", TB: "Buccaneers", TEN: "Titans", WAS: "Commanders",
};

const NFL_DIVISIONS: Record<string, Record<string, string[]>> = {
  AFC: {
    East: ["BUF", "MIA", "NE", "NYJ"],
    North: ["BAL", "CIN", "CLE", "PIT"],
    South: ["HOU", "IND", "JAX", "TEN"],
    West: ["DEN", "KC", "LAC", "LV"],
  },
  NFC: {
    East: ["DAL", "NYG", "PHI", "WAS"],
    North: ["CHI", "DET", "GB", "MIN"],
    South: ["ATL", "CAR", "NO", "TB"],
    West: ["ARI", "LAR", "SEA", "SF"],
  },
};

const POSITION_ORDER = ["QB", "RB", "WR", "TE"];


const POS_DISPLAY_LIMITS: Record<string, number> = {
  QB: 2, RB: 4, WR: 6, TE: 3,
};

function getTeamLogoUrl(team: string) {
  return `https://sleepercdn.com/images/team_logos/nfl/${team.toLowerCase()}.png`;
}

function getHeadshotUrl(playerId: string) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${playerId}.jpg`;
}

function TeamTile({
  team,
  onClick,
}: {
  team: string;
  onClick: () => void;
}) {
  const teamColor = TEAM_COLORS[team] || "#666";
  const teamName = TEAM_FULL_NAMES[team] || team;

  return (
    <div
      className="sc-team-tile"
      style={{ '--tile-color': teamColor } as React.CSSProperties}
      onClick={onClick}
      data-testid={`tile-team-${team}`}
    >
      <div className="sc-team-tile__accent" style={{ backgroundColor: teamColor }} />
      <div className="sc-team-tile__logo">
        <img
          src={getTeamLogoUrl(team)}
          alt={`${team} ${teamName} logo`}
          loading="lazy"
          data-testid={`img-team-logo-${team}`}
        />
      </div>
      <div className="sc-team-tile__meta">
        <div className="sc-team-tile__abbr" data-testid={`text-team-abbr-${team}`}>{team}</div>
        <div className="sc-team-tile__name" data-testid={`text-team-name-${team}`}>{teamName}</div>
      </div>
      <ChevronRight className="sc-team-tile__arrow" />
    </div>
  );
}

function PlayerCard({
  player,
  pos,
  depthLabel,
  onClick,
}: {
  player: IndexedPlayer;
  pos: string;
  depthLabel: string;
  onClick: () => void;
}) {
  const labelNum = parseInt(depthLabel.replace(/[^0-9]/g, '') || '1', 10);
  const tier = labelNum <= 1 ? 'Starter' : (labelNum === 2 ? 'Backup' : 'Depth');

  return (
    <div
      className={`sc-card sc-card--${pos.toLowerCase()}`}
      onClick={onClick}
      data-testid={`card-player-${player.slug}`}
    >
      <div className="sc-card__img">
        <img
          src={getHeadshotUrl(player.id)}
          alt={player.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.style.display = 'none';
            img.parentElement?.classList.add('sc-card__img--fallback');
          }}
          data-testid={`img-headshot-${player.slug}`}
        />
        <div className="sc-card__pos" data-testid={`card-pos-${player.slug}`}>{pos}</div>
        <div className="sc-card__fallback-initials">
          {player.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <div className="sc-card__gold" />
      <div className="sc-card__body">
        <div className="sc-card__name" data-testid={`card-name-${player.slug}`}>
          {player.name}
        </div>
        <div className="sc-card__meta">
          <span className={POSITION_COLORS[pos] || ""} data-testid={`card-depth-${player.slug}`}>{depthLabel}</span>
          <span className="sc-card__tier" data-testid={`card-tier-${player.slug}`}>{tier}</span>
        </div>
      </div>
    </div>
  );
}

function TeamBoard({
  team,
  positions,
  onBack,
}: {
  team: string;
  positions: Record<string, IndexedPlayer[]>;
  onBack: () => void;
}) {
  const [, navigate] = useLocation();
  const [showBench, setShowBench] = useState(false);
  const teamColor = TEAM_COLORS[team] || "#666";
  const teamName = TEAM_FULL_NAMES[team] || team;

  const sections = useMemo(() => {
    return POSITION_ORDER.map(pos => {
      const players = positions[pos] || [];
      const limit = POS_DISPLAY_LIMITS[pos] || 1;
      const starters = players.slice(0, limit);
      const bench = players.slice(limit);
      return { pos, starters, bench };
    });
  }, [positions]);

  const totalBench = sections.reduce((s, sec) => s + sec.bench.length, 0);

  return (
    <div className="sc-board sc-directory" data-testid="team-board-view">
      <div className="sc-board__header">
        <div className="sc-board__header-inner">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="sc-board__back"
              onClick={onBack}
              data-testid="button-back-league"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              League View
            </button>
            <div className="sc-board__team-badge" style={{ '--team-color': teamColor } as React.CSSProperties}>
              <img src={getTeamLogoUrl(team)} alt="" className="sc-board__team-logo" />
              <h2 className="sc-board__team-name" data-testid="text-team-board-name">
                {team} {teamName}
              </h2>
            </div>
            <div className="sc-board__label" data-testid="text-board-subtitle">
              <Zap className="w-3.5 h-3.5" />
              Fantasy Roster Board
            </div>
          </div>
        </div>
      </div>

      <div className="sc-board__divider" />

      <div className="sc-board__wall" data-testid="board-grid">
        {sections.map(({ pos, starters }) => (
          starters.length > 0 && (
            <div key={pos} className="sc-board__section" data-testid={`board-section-${pos}`}>
              <h3 className="sc-board__section-title">{pos}</h3>
              <div className="sc-board__cards">
                {starters.map((player) => (
                  <PlayerCard
                    key={player.slug}
                    player={player}
                    pos={pos}
                    depthLabel={player.rank_label}
                    onClick={() => navigate(`/nfl/players/${player.slug}/`)}
                  />
                ))}
              </div>
            </div>
          )
        ))}

        {totalBench > 0 && (
          <div className="sc-bench" data-testid="bench-section">
            <button
              type="button"
              className="sc-bench__toggle"
              onClick={() => setShowBench(!showBench)}
              data-testid="button-toggle-bench"
            >
              <ChevronRight className={`sc-bench__toggle-icon ${showBench ? 'sc-bench__toggle-icon--open' : ''}`} />
              <span>{showBench ? 'Hide Full Roster' : 'Show Full Roster'}</span>
              <span className="sc-bench__count">{totalBench}</span>
            </button>

            {showBench && (
              <div className="sc-bench__cards" data-testid="bench-list">
                {sections.map(({ pos, bench }) =>
                  bench.map((player) => (
                    <PlayerCard
                      key={player.slug}
                      player={player}
                      pos={pos}
                      depthLabel={player.rank_label}
                      onClick={() => navigate(`/nfl/players/${player.slug}/`)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlayerSearch() {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [conference, setConference] = useState("AFC");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const { data: players, isLoading: playersLoading } = useQuery<LightPlayer[]>({
    queryKey: ["/api/players"],
  });

  const { data: indexedData, isLoading: indexedLoading } = useQuery<IndexedData>({
    queryKey: ["/api/indexed-players"],
  });

  const isSearching = search.trim().length > 0 || posFilter !== "ALL";

  const indexedFlat = useMemo(() => {
    if (!indexedData?.byTeam) return [] as IndexedPlayer[];
    const all: IndexedPlayer[] = [];
    for (const teamPositions of Object.values(indexedData.byTeam)) {
      for (const posPlayers of Object.values(teamPositions)) {
        all.push(...posPlayers);
      }
    }
    return all;
  }, [indexedData]);

  const posCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const pos of POSITION_ORDER) {
      counts[pos] = indexedFlat.filter(p => p.position === pos).length;
    }
    return counts;
  }, [indexedFlat]);

  const autocompleteResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase().trim();
    const indexedMatches = indexedFlat
      .filter(p => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q))
      .slice(0, 8);
    if (indexedMatches.length >= 4) return indexedMatches;
    const indexedSlugs = new Set(indexedMatches.map(p => p.slug));
    const extras = (players || [])
      .filter(p => !indexedSlugs.has(p.slug) && (p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)))
      .slice(0, 8 - indexedMatches.length);
    return [...indexedMatches, ...extras];
  }, [indexedFlat, players, search]);

  const filtered = useMemo(() => {
    let result: (IndexedPlayer | LightPlayer)[] = indexedFlat;
    if (posFilter !== "ALL") {
      result = result.filter((p) => p.position === posFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result.slice(0, 100);
  }, [indexedFlat, search, posFilter]);

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
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showAutocomplete || autocompleteResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < autocompleteResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : autocompleteResults.length - 1
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const player = autocompleteResults[activeIndex];
        setShowAutocomplete(false);
        navigate(`/nfl/players/${player.slug}/`);
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
    },
    [showAutocomplete, autocompleteResults, activeIndex, navigate]
  );

  const totalPlayers = indexedData?.slugs?.length || 352;

  return (
    <div className="min-h-screen bg-background">

      {stickyVisible && !isSearching && (
        <div className="sc-sticky-bar" data-testid="sticky-filter-bar">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Quick search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowAutocomplete(true);
                }}
                className="pl-10"
                data-testid="input-sticky-search"
              />
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {POSITION_ORDER.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  className={`sc-filter-pill ${posFilter === pos ? 'sc-filter-pill--active' : ''}`}
                  onClick={() => setPosFilter(posFilter === pos ? "ALL" : pos)}
                  data-testid={`button-sticky-filter-${pos}`}
                >
                  {pos}
                  {posCounts[pos] ? <span className="sc-filter-pill__count">{posCounts[pos]}</span> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        ref={heroRef}
        className="sc-header"
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="sc-hero-title" data-testid="text-page-title">
                Fantasy Football Player Stats &amp; Analytics
              </h1>
              <div className="sc-hero-underline" />
              <p className="sc-header__sub mt-3">
                Search, filter, and analyze every fantasy-relevant starter across all 32 NFL teams.
              </p>
            </div>
          </div>

          <div className="mt-6" ref={searchRef}>
            <div className="relative max-w-2xl group">
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
                  <Keyboard className="w-2.5 h-2.5" />
                  /
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
                          i === activeIndex
                            ? "bg-muted"
                            : "hover:bg-muted/50"
                        }`}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => setShowAutocomplete(false)}
                        data-testid={`autocomplete-item-${player.slug}`}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {player.position || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm text-foreground truncate block">
                            {player.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={POSITION_COLORS[player.position || ""] || ""}>{player.position}</span>
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

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {POSITION_ORDER.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  className={`sc-filter-pill ${posFilter === pos ? 'sc-filter-pill--active' : ''}`}
                  onClick={() => setPosFilter(posFilter === pos ? "ALL" : pos)}
                  data-testid={`button-filter-${pos}`}
                >
                  {pos}
                  {posCounts[pos] ? <span className="sc-filter-pill__count">{posCounts[pos]}</span> : null}
                </button>
              ))}
              {posFilter !== "ALL" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setPosFilter("ALL")}
                  data-testid="button-clear-filter"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className={selectedTeam ? '' : 'max-w-7xl mx-auto px-4 py-8'}>
        {isSearching ? (
          indexedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-md" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-5" data-testid="text-results-count">
                {filtered.length === 100 ? "Showing first 100 results" : `${filtered.length} player${filtered.length !== 1 ? "s" : ""} found`}
                {search.trim() && ` for "${search}"`}
              </p>

              {filtered.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium">No players found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filtered.map((player) => {
                    const pos = player.position || "";
                    const rankLabel = 'rank_label' in player ? (player as IndexedPlayer).rank_label : pos;
                    return (
                      <Link key={player.id} href={`/nfl/players/${player.slug}/`}>
                        <div
                          className={`sc-result-card sc-result-card--${pos.toLowerCase()}`}
                          data-testid={`card-player-${player.slug}`}
                        >
                          <div className="sc-result-card__img">
                            <img
                              src={getHeadshotUrl(player.id)}
                              alt={player.name}
                              loading="lazy"
                              onError={(e) => {
                                const img = e.currentTarget;
                                img.onerror = null;
                                img.style.display = 'none';
                                img.parentElement?.classList.add('sc-result-card__img--fallback');
                              }}
                            />
                            <div className="sc-result-card__initials">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="sc-result-card__gold" />
                          <div className="sc-result-card__body">
                            <div className="sc-result-card__name" data-testid={`text-player-name-${player.slug}`}>
                              {player.name}
                            </div>
                            <div className="sc-result-card__meta">
                              <span className={POSITION_COLORS[pos] || ""}>{rankLabel}</span>
                              <span className="sc-result-card__team">{player.team}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )
        ) : indexedLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-64 mx-auto" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Card key={j}>
                      <CardContent className="p-5">
                        <Skeleton className="h-5 w-12 mb-3" />
                        <div className="space-y-2">
                          {Array.from({ length: 6 }).map((_, k) => (
                            <Skeleton key={k} className="h-4 w-full" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : indexedData && indexedData.byTeam ? (
          selectedTeam && indexedData.byTeam[selectedTeam] ? (
            <TeamBoard
              team={selectedTeam}
              positions={indexedData.byTeam[selectedTeam]}
              onBack={() => setSelectedTeam(null)}
            />
          ) : (
          <div>
            <Tabs defaultValue="AFC" value={conference} onValueChange={setConference} data-testid="tabs-conference">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <TabsList data-testid="tabs-conference-list">
                  <TabsTrigger value="AFC" data-testid="tab-afc">AFC</TabsTrigger>
                  <TabsTrigger value="NFC" data-testid="tab-nfc">NFC</TabsTrigger>
                </TabsList>
                <div className="sc-stat-card" data-testid="badge-player-count">
                  <Activity className="w-4 h-4 sc-header__gold-icon" />
                  <div>
                    <p className="sc-stat-card__number">{totalPlayers}</p>
                    <p className="sc-stat-card__label">Fantasy Starters</p>
                  </div>
                </div>
              </div>

              {["AFC", "NFC"].map((conf) => (
                <TabsContent key={conf} value={conf}>
                  <div className="space-y-8">
                    {Object.entries(NFL_DIVISIONS[conf]).map(([divName, teams]) => (
                      <div key={divName}>
                        <h2
                          className="sc-division-heading"
                          data-testid={`text-division-${conf.toLowerCase()}-${divName.toLowerCase()}`}
                        >
                          {conf} {divName}
                          <div className="flex-1 h-px bg-amber-400/30 ml-2" />
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                          {teams.map((team) => {
                            const teamData = indexedData.byTeam[team];
                            if (!teamData) return null;
                            return (
                              <TeamTile
                                key={team}
                                team={team}
                                onClick={() => setSelectedTeam(team)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          )
        ) : null}
      </main>

    </div>
  );
}
