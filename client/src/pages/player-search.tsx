import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowLeft, Users, TrendingUp } from "lucide-react";

type LightPlayer = {
  id: string;
  name: string;
  slug: string;
  team: string;
  position: string;
};

const POSITION_COLORS: Record<string, string> = {
  QB: "bg-red-500/15 text-red-700 dark:text-red-400",
  RB: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  WR: "bg-green-500/15 text-green-700 dark:text-green-400",
  TE: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  K: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  DEF: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
};

export default function PlayerSearch() {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const { data: players, isLoading } = useQuery<LightPlayer[]>({
    queryKey: ["/api/players"],
  });

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-page-title">
              NFL Player Database
            </h1>
          </div>
          <p className="text-muted-foreground">
            Search over 4,000 NFL players. Click any player for their full fantasy profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search by name or team..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => {
                if (search.trim()) setShowAutocomplete(true);
              }}
              onKeyDown={handleKeyDown}
              className="pl-10"
              autoComplete="off"
              role="combobox"
              aria-expanded={showAutocomplete && autocompleteResults.length > 0}
              aria-controls="autocomplete-list"
              aria-activedescendant={activeIndex >= 0 ? `autocomplete-item-${activeIndex}` : undefined}
              data-testid="input-player-search"
            />

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
          <Select value={posFilter} onValueChange={setPosFilter}>
            <SelectTrigger className="w-full sm:w-[140px]" data-testid="select-position-filter">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Positions</SelectItem>
              <SelectItem value="QB">QB</SelectItem>
              <SelectItem value="RB">RB</SelectItem>
              <SelectItem value="WR">WR</SelectItem>
              <SelectItem value="TE">TE</SelectItem>
              <SelectItem value="K">K</SelectItem>
              <SelectItem value="DEF">DEF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
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
        )}
      </main>

      <footer className="border-t bg-card mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          StatChasers - Fantasy Football Intelligence
        </div>
      </footer>
    </div>
  );
}
