import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Search,
  ArrowLeft,
  Users,
  TrendingUp,
  Keyboard,
  Trophy,
  BarChart3,
  FileText,
  Activity,
  Calendar,
  Shield,
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
  QB: "bg-red-500/15 text-red-700 dark:text-red-400",
  RB: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  WR: "bg-green-500/15 text-green-700 dark:text-green-400",
  TE: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  K: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  DEF: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
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

const POSITION_ORDER = ["QB", "RB", "WR", "TE", "K", "DEF"];

const STARTER_POSITIONS: Record<string, number> = {
  QB: 1, RB: 1, WR: 1, TE: 1, K: 1, DEF: 1,
};

function TeamRoster({
  team,
  positions,
  startersOnly,
  onPlayerClick,
}: {
  team: string;
  positions: Record<string, IndexedPlayer[]>;
  startersOnly: boolean;
  onPlayerClick: (player: IndexedPlayer) => void;
}) {
  const teamColor = TEAM_COLORS[team] || "#666";
  const teamName = TEAM_FULL_NAMES[team] || team;

  return (
    <Card
      className="h-full transition-all duration-200 hover-elevate overflow-visible"
      data-testid={`card-team-${team}`}
    >
      <CardContent className="p-0">
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderLeft: `3px solid ${teamColor}` }}
        >
          <h3 className="font-bold text-foreground text-sm tracking-wide" data-testid={`text-team-name-${team}`}>
            {team}
          </h3>
          <span className="text-xs text-muted-foreground">{teamName}</span>
        </div>
        <Separator />
        <div className="px-3 py-2">
          {POSITION_ORDER.map((pos, posIdx) => {
            let players = positions[pos];
            if (!players || players.length === 0) return null;
            if (startersOnly) {
              players = players.slice(0, STARTER_POSITIONS[pos] || 1);
            }
            return (
              <div key={pos}>
                {posIdx > 0 && positions[POSITION_ORDER[posIdx - 1]]?.length > 0 && (
                  <Separator className="my-1 opacity-50" />
                )}
                <div className="mb-0.5">
                  <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                    {pos}
                  </span>
                </div>
                {players.map((p) => (
                  <div
                    key={p.slug}
                    className="flex items-center gap-2 py-1 hover-elevate rounded px-1 cursor-pointer group flex-wrap"
                    onClick={() => onPlayerClick(p)}
                    data-testid={`link-indexed-player-${p.slug}`}
                  >
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0 min-w-[36px] text-center font-mono ${POSITION_COLORS[pos] || ""}`}
                    >
                      {p.rank_label}
                    </Badge>
                    <span className="text-sm text-foreground truncate flex-1">{p.name}</span>
                    {p.years_exp !== null && p.years_exp > 0 && (
                      <span className="text-[10px] text-muted-foreground/50 font-mono">
                        Yr {p.years_exp}
                      </span>
                    )}
                    <ChevronRight className="w-3 h-3 text-muted-foreground/30 invisible group-hover:visible flex-shrink-0" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerSlideOver({
  player,
  open,
  onClose,
}: {
  player: IndexedPlayer | null;
  open: boolean;
  onClose: () => void;
}) {
  const [, navigate] = useLocation();

  if (!player) return null;

  const teamColor = TEAM_COLORS[player.team] || "#666";
  const teamName = TEAM_FULL_NAMES[player.team] || player.team;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto" data-testid="sheet-player-preview">
        <SheetHeader>
          <SheetTitle className="text-left" data-testid="sheet-player-name">{player.name}</SheetTitle>
          <SheetDescription className="text-left flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: teamColor }}
            />
            {player.team} {teamName}
            <Badge
              variant="secondary"
              className={`text-[10px] ${POSITION_COLORS[player.position] || ""}`}
            >
              {player.rank_label}
            </Badge>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Position</p>
              <p className="font-semibold text-foreground text-sm">{player.position}</p>
            </div>
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rank</p>
              <p className="font-semibold text-foreground text-sm">{player.rank_label}</p>
            </div>
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
              <p className="font-semibold text-foreground text-sm">
                {player.years_exp !== null ? `${player.years_exp} yr${player.years_exp !== 1 ? 's' : ''}` : 'Rookie'}
              </p>
            </div>
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Status</p>
              <p className="font-semibold text-foreground text-sm">{player.status || 'N/A'}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Quick Actions</p>
            <div className="space-y-2">
              <Link href={`/nfl/players/${player.slug}/`}>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  onClick={onClose}
                  data-testid="button-view-full-profile"
                >
                  <Activity className="w-4 h-4" />
                  View Full Profile
                </Button>
              </Link>
              <Link href="/rankings/">
                <Button className="w-full justify-start gap-2" variant="outline" onClick={onClose} data-testid="button-rankings-link">
                  <Trophy className="w-4 h-4" />
                  Rankings
                </Button>
              </Link>
              <Link href="/tools/">
                <Button className="w-full justify-start gap-2" variant="outline" onClick={onClose} data-testid="button-tools-link">
                  <BarChart3 className="w-4 h-4" />
                  Analysis Tools
                </Button>
              </Link>
              <Link href="/articles/">
                <Button className="w-full justify-start gap-2" variant="outline" onClick={onClose} data-testid="button-articles-link">
                  <FileText className="w-4 h-4" />
                  Articles & News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function PlayerSearch() {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [conference, setConference] = useState("AFC");
  const [startersOnly, setStartersOnly] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IndexedPlayer | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
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

  const autocompleteResults = useMemo(() => {
    if (!players || !search.trim()) return [];
    const q = search.toLowerCase().trim();
    return players
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [players, search]);

  const filtered = useMemo(() => {
    if (!players) return [];
    let result = players;
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
    return result.slice(0, 100);
  }, [players, search, posFilter]);

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

  const handlePlayerClick = useCallback((player: IndexedPlayer) => {
    setSelectedPlayer(player);
    setSheetOpen(true);
  }, []);

  const divisions = NFL_DIVISIONS[conference] || {};

  const totalPlayers = indexedData?.slugs?.length || 352;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <span className="text-lg font-bold tracking-tight text-foreground" data-testid="link-logo">
                StatChasers
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/rankings/">
              <Button variant="ghost" size="sm" data-testid="link-rankings">Rankings</Button>
            </Link>
            <Link href="/tools/">
              <Button variant="ghost" size="sm" data-testid="link-tools">Tools</Button>
            </Link>
            <Link href="/articles/">
              <Button variant="ghost" size="sm" data-testid="link-articles">Articles</Button>
            </Link>
          </nav>
        </div>
      </header>

      {stickyVisible && !isSearching && (
        <div className="sticky top-[57px] z-40 border-b bg-card/95 backdrop-blur-sm" data-testid="sticky-filter-bar">
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
                <Button
                  key={pos}
                  variant={posFilter === pos ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPosFilter(posFilter === pos ? "ALL" : pos)}
                  data-testid={`button-sticky-filter-${pos}`}
                >
                  {pos}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <Button
                variant={startersOnly ? "default" : "outline"}
                size="sm"
                className="gap-1"
                onClick={() => setStartersOnly(!startersOnly)}
                data-testid="button-sticky-starters-toggle"
              >
                <Zap className="w-3 h-3" />
                Starters
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={heroRef}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Command Index</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" data-testid="text-page-title">
                NFL Player Command Index
              </h1>
              <div className="w-12 h-0.5 bg-amber-400 mb-3" />
              <p className="text-gray-300 text-sm md:text-base max-w-lg">
                Search, filter, and analyze every fantasy-relevant starter across all 32 NFL teams.
              </p>
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-4 py-2.5 flex items-center gap-2"
              data-testid="badge-player-count"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-xl font-bold text-white font-mono leading-none">{totalPlayers}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fantasy Starters</p>
              </div>
            </div>
          </div>

          <div className="mt-6" ref={searchRef}>
            <div className="relative max-w-2xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
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
                className="pl-12 pr-20 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-md focus:bg-white/15 focus:border-amber-400/50 focus:ring-amber-400/20 transition-all"
                autoComplete="off"
                role="combobox"
                aria-expanded={showAutocomplete && autocompleteResults.length > 0}
                aria-controls="autocomplete-list"
                aria-activedescendant={activeIndex >= 0 ? `autocomplete-item-${activeIndex}` : undefined}
                data-testid="input-player-search"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-gray-400 font-mono">
                  <Keyboard className="w-2.5 h-2.5" />
                  /
                </kbd>
              </div>

              {showAutocomplete && search.trim() && autocompleteResults.length > 0 && (
                <div
                  id="autocomplete-list"
                  ref={listRef}
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto"
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
                            ? "bg-accent"
                            : "hover-elevate"
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
                            <Badge
                              variant="secondary"
                              className={`text-[10px] px-1.5 py-0 ${POSITION_COLORS[player.position || ""] || ""}`}
                            >
                              {player.position}
                            </Badge>
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
                <Button
                  key={pos}
                  variant={posFilter === pos ? "default" : "outline"}
                  size="sm"
                  className={`border-white/20 ${
                    posFilter === pos
                      ? ""
                      : "text-gray-300 bg-transparent"
                  }`}
                  onClick={() => setPosFilter(posFilter === pos ? "ALL" : pos)}
                  data-testid={`button-filter-${pos}`}
                >
                  {pos}
                </Button>
              ))}
              {posFilter !== "ALL" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
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

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isSearching ? (
          playersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
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
              <p className="text-sm text-muted-foreground mb-4" data-testid="text-results-count">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filtered.map((player) => (
                    <Link key={player.id} href={`/nfl/players/${player.slug}/`}>
                      <Card
                        className="hover-elevate cursor-pointer transition-all h-full"
                        data-testid={`card-player-${player.slug}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                              <span className="text-xs font-bold text-muted-foreground">
                                {player.position || "?"}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-foreground truncate" data-testid={`text-player-name-${player.slug}`}>
                                  {player.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${POSITION_COLORS[player.position || ""] || ""}`}
                                >
                                  {player.position}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{player.team}</span>
                              </div>
                            </div>
                            <TrendingUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Card key={j}>
                      <CardContent className="p-4">
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
          <div>
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <p className="text-sm text-muted-foreground" data-testid="text-indexed-count">
                {totalPlayers} fantasy-relevant players across 32 NFL teams
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={startersOnly ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setStartersOnly(!startersOnly)}
                  data-testid="button-starters-toggle"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {startersOnly ? "Starters Only" : "All Relevant"}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="AFC" value={conference} onValueChange={setConference} data-testid="tabs-conference">
              <TabsList className="mb-4" data-testid="tabs-conference-list">
                <TabsTrigger value="AFC" data-testid="tab-afc">AFC</TabsTrigger>
                <TabsTrigger value="NFC" data-testid="tab-nfc">NFC</TabsTrigger>
              </TabsList>

              {["AFC", "NFC"].map((conf) => (
                <TabsContent key={conf} value={conf}>
                  <Tabs defaultValue="East">
                    <TabsList className="mb-4" data-testid={`tabs-division-${conf.toLowerCase()}`}>
                      {Object.keys(NFL_DIVISIONS[conf]).map((div) => (
                        <TabsTrigger key={div} value={div} data-testid={`tab-${conf.toLowerCase()}-${div.toLowerCase()}`}>
                          {div}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {Object.entries(NFL_DIVISIONS[conf]).map(([divName, teams]) => (
                      <TabsContent key={divName} value={divName}>
                        <h2
                          className="text-base font-bold text-foreground mb-3 flex items-center gap-2"
                          data-testid={`text-division-${conf.toLowerCase()}-${divName.toLowerCase()}`}
                        >
                          {conf} {divName}
                          <div className="flex-1 h-px bg-amber-400/30 ml-2" />
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {teams.map((team) => {
                            const teamData = indexedData.byTeam[team];
                            if (!teamData) return null;
                            return (
                              <TeamRoster
                                key={team}
                                team={team}
                                positions={teamData}
                                startersOnly={startersOnly}
                                onPlayerClick={handlePlayerClick}
                              />
                            );
                          })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ) : null}
      </main>

      <PlayerSlideOver
        player={selectedPlayer}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />

      <footer className="border-t bg-card mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          StatChasers - Fantasy Football Intelligence
        </div>
      </footer>
    </div>
  );
}
