import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Trophy,
  BarChart3,
  FileText,
  User,
  Activity,
  Ruler,
  Weight,
  Calendar,
  Shield,
  AlertTriangle,
  TrendingUp,
  Search,
  Newspaper,
  Table,
  Users,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Player, GameLogEntry, NewsEntry, GameLogStats } from "@shared/playerTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function PlayerHeadshot({ url, name }: { url: string | null; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (url && !imgError) {
    return (
      <img
        src={url}
        alt={`${name} headshot`}
        className="w-20 h-20 rounded-md object-cover bg-muted"
        onError={() => setImgError(true)}
        data-testid="img-headshot"
      />
    );
  }
  return (
    <div
      className="w-20 h-20 rounded-md bg-muted flex items-center justify-center"
      data-testid="img-headshot-fallback"
    >
      <User className="w-10 h-10 text-muted-foreground/40" />
    </div>
  );
}

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground text-sm" data-testid={`text-snapshot-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {value != null && value !== "" ? value : "\u2014"}
        </p>
      </div>
    </div>
  );
}

type ColumnDef = { key: string; label: string; abbr?: string };

function getPositionColumns(position: string | null): ColumnDef[] {
  switch (position) {
    case "QB":
      return [
        { key: "pass_cmp", label: "CMP" },
        { key: "pass_att", label: "ATT" },
        { key: "pass_yd", label: "YDS", abbr: "Pass" },
        { key: "pass_td", label: "TD", abbr: "Pass" },
        { key: "pass_int", label: "INT" },
        { key: "rush_att", label: "CAR" },
        { key: "rush_yd", label: "Rush YDS" },
        { key: "rush_td", label: "Rush TD" },
      ];
    case "RB":
      return [
        { key: "rush_att", label: "CAR" },
        { key: "rush_yd", label: "YDS", abbr: "Rush" },
        { key: "rush_td", label: "TD", abbr: "Rush" },
        { key: "rec_tgt", label: "TGT" },
        { key: "rec", label: "REC" },
        { key: "rec_yd", label: "Rec YDS" },
        { key: "rec_td", label: "Rec TD" },
      ];
    case "WR":
    case "TE":
      return [
        { key: "rec_tgt", label: "TGT" },
        { key: "rec", label: "REC" },
        { key: "rec_yd", label: "YDS", abbr: "Rec" },
        { key: "rec_td", label: "TD", abbr: "Rec" },
        { key: "rush_att", label: "CAR" },
        { key: "rush_yd", label: "Rush YDS" },
      ];
    case "K":
      return [
        { key: "fgm", label: "FGM" },
        { key: "fga", label: "FGA" },
        { key: "fgm_lng", label: "FG LNG" },
        { key: "xpm", label: "XPM" },
        { key: "xpa", label: "XPA" },
      ];
    default:
      return [];
  }
}

function GameLogTable({ entries = [], position }: { entries?: GameLogEntry[]; position: string | null }) {
  const columns = getPositionColumns(position);
  const colCount = 3 + columns.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="table-game-log">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-3 text-muted-foreground font-medium whitespace-nowrap">WK</th>
            <th className="py-2 pr-3 text-muted-foreground font-medium whitespace-nowrap">OPP</th>
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-3 text-muted-foreground font-medium text-right whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="py-2 text-muted-foreground font-medium text-right whitespace-nowrap">FPTS</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry, i) => (
              <tr key={i} className="border-b last:border-0" data-testid={`row-gamelog-week-${entry.week}`}>
                <td className="py-2 pr-3 text-foreground font-medium">{entry.week}</td>
                <td className="py-2 pr-3 text-foreground whitespace-nowrap">{entry.opp}</td>
                {columns.map((col) => (
                  <td key={col.key} className="py-2 pr-3 text-foreground text-right tabular-nums">
                    {(entry.stats as unknown as Record<string, number>)[col.key] ?? 0}
                  </td>
                ))}
                <td className="py-2 text-right font-semibold text-foreground tabular-nums">
                  {entry.stats.pts_ppr.toFixed(1)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colCount} className="py-8">
                <div className="text-center">
                  <Table className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm font-medium">No game log data yet</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Game log data will be available once the season begins.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {entries.length > 0 && (
          <tfoot>
            <tr className="border-t font-semibold">
              <td className="py-2 pr-3 text-foreground">TOT</td>
              <td className="py-2 pr-3"></td>
              {columns.map((col) => (
                <td key={col.key} className="py-2 pr-3 text-foreground text-right tabular-nums">
                  {entries.reduce((sum, e) => sum + ((e.stats as unknown as Record<string, number>)[col.key] ?? 0), 0)}
                </td>
              ))}
              <td className="py-2 text-right text-foreground tabular-nums">
                {entries.reduce((sum, e) => sum + e.stats.pts_ppr, 0).toFixed(1)}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

function NewsSection({ entries = [], playerName }: { entries?: NewsEntry[]; playerName: string }) {
  if (entries.length > 0) {
    return (
      <div className="space-y-3" data-testid="news-list">
        {entries.map((entry, i) => (
          <a
            key={i}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            data-testid={`link-news-${i}`}
          >
            <div className="flex items-start gap-3 p-3 rounded-md hover-elevate cursor-pointer">
              <Newspaper className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{entry.title}</p>
                {entry.summary && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.summary}</p>
                )}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60">{entry.source}</span>
                  <span className="text-[10px] text-muted-foreground/40">
                    {new Date(entry.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-dashed border-muted-foreground/25 p-8 text-center">
      <Newspaper className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-muted-foreground text-sm font-medium">No articles yet</p>
      <p className="text-muted-foreground/70 text-xs mt-1">
        News and analysis related to {playerName} will appear here as they are published.
      </p>
    </div>
  );
}

function TrendsSection({ trends, playerName }: { trends: Player["trends"]; playerName: string }) {
  if (trends && trends.weeklyFantasyPoints.length > 0) {
    const pts = trends.weeklyFantasyPoints;
    const max = Math.max(...pts);
    return (
      <div data-testid="trends-chart">
        <div className="flex items-end gap-1 h-32">
          {pts.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary/60 rounded-t-sm min-h-[2px]"
                style={{ height: `${max > 0 ? (val / max) * 100 : 0}%` }}
              />
              <span className="text-[9px] text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">Week</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-dashed border-muted-foreground/25 p-8 text-center">
      <TrendingUp className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-muted-foreground text-sm font-medium">Trend data coming soon</p>
      <p className="text-muted-foreground/70 text-xs mt-1">
        Week-over-week fantasy scoring trends for {playerName} will appear here.
      </p>
    </div>
  );
}

type PlayerWithSeasons = Player & { availableSeasons?: number[] };

function GameLogCard({ player }: { player: PlayerWithSeasons }) {
  const availableSeasons = player.availableSeasons || (player.season ? [player.season] : []);
  const [selectedSeason, setSelectedSeason] = useState<number>(availableSeasons[0] || new Date().getFullYear());

  const isDefaultSeason = selectedSeason === availableSeasons[0];

  const { data: seasonGameLog, isLoading: isSeasonLoading } = useQuery<GameLogEntry[]>({
    queryKey: ["/api/players", player.slug, "game-log", selectedSeason],
    queryFn: async () => {
      const res = await fetch(`/api/players/${player.slug}/game-log?season=${selectedSeason}`);
      if (!res.ok) throw new Error("Failed to fetch game log");
      return res.json();
    },
    enabled: !isDefaultSeason,
  });

  const entries = isDefaultSeason ? (player.gameLog || []) : (seasonGameLog || []);

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Table className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-gamelog-heading">
              Game Log
            </h2>
          </div>
          {availableSeasons.length > 1 && (
            <Select value={String(selectedSeason)} onValueChange={(v) => setSelectedSeason(Number(v))}>
              <SelectTrigger className="w-28" data-testid="select-season">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableSeasons.map((s) => (
                  <SelectItem key={s} value={String(s)} data-testid={`option-season-${s}`}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {availableSeasons.length === 1 && (
            <span className="text-sm text-muted-foreground">{selectedSeason}</span>
          )}
        </div>
        {isSeasonLoading && !isDefaultSeason ? (
          <div className="py-8 text-center">
            <Skeleton className="h-4 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        ) : (
          <GameLogTable entries={entries} position={player.position} />
        )}
      </CardContent>
    </Card>
  );
}

function PlayerProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Skeleton className="w-20 h-20 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PlayerProfile() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: player, isLoading, error } = useQuery<Player>({
    queryKey: ["/api/players", slug],
  });

  const { data: relatedPlayers } = useQuery<LightPlayer[]>({
    queryKey: ["/api/players", slug, "related"],
    enabled: !!player,
  });

  useEffect(() => {
    if (!player) return;

    document.title = `${player.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;

    const desc = `View ${player.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for ${player.season} NFL season.`;
    const canonical = `https://statchasers.com/nfl/players/${player.slug}/`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: player.name,
      sport: "American Football",
      url: canonical,
    };
    if (player.team && player.team !== "FA") {
      jsonLd.affiliation = { "@type": "SportsTeam", name: player.team };
    }
    let scriptTag = document.getElementById("sc-jsonld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "sc-jsonld";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = "StatChasers";
      metaDesc?.setAttribute("content", "");
      linkCanonical?.setAttribute("href", "");
      scriptTag?.remove();
    };
  }, [player]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back-skeleton">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Skeleton className="h-5 w-24" />
          </div>
        </header>
        <PlayerProfileSkeleton />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back-error">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <span className="font-bold text-foreground">StatChasers</span>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-not-found">Player Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a player with that profile. They may not be in our database.
          </p>
          <Link href="/nfl/players">
            <Button data-testid="button-search-again">
              <Search className="w-4 h-4 mr-2" />
              Search Players
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back">
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
            <Link href="/nfl/players">
              <Button variant="ghost" size="sm" data-testid="link-players">
                <Search className="w-4 h-4 mr-1" />
                Players
              </Button>
            </Link>
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-3 flex-wrap">
            <PlayerHeadshot url={player.headshotUrl} name={player.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-player-name">
                  {player.name}
                </h1>
                {player.position && (
                  <Badge
                    variant="secondary"
                    className={POSITION_COLORS[player.position] || ""}
                    data-testid="badge-position"
                  >
                    {player.position}
                  </Badge>
                )}
                {player.injury_status && (
                  <Badge variant="destructive" data-testid="badge-injury">
                    {player.injury_status}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground" data-testid="text-team">
                {player.team ? player.team : "Free Agent"} {player.position ? `| ${player.position}` : ""}
                {player.season ? ` | ${player.season} Season` : ""}
              </p>
            </div>
          </div>
        </div>

        {player.injury_status && (
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Injury Status: {player.injury_status}</p>
                  <p className="text-sm text-muted-foreground">
                    This player is currently listed with an injury designation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-snapshot-heading">
                Player Snapshot
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <SnapshotItem icon={Calendar} label="Age" value={player.age} />
              <SnapshotItem icon={Ruler} label="Height" value={player.height} />
              <SnapshotItem icon={Weight} label="Weight" value={player.weight ? `${player.weight} lbs` : null} />
              <SnapshotItem icon={Shield} label="Status" value={player.status} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-trends-heading">Trends</h2>
            </div>
            <TrendsSection trends={player.trends} playerName={player.name} />
          </CardContent>
        </Card>

        <GameLogCard player={player} />

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Newspaper className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-news-heading">Articles & News</h2>
            </div>
            <NewsSection entries={player.news} playerName={player.name} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-rankings-heading">Rankings & Projections</h2>
            </div>
            <div className="rounded-md border border-dashed border-muted-foreground/25 p-8 text-center">
              <BarChart3 className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">Projections coming soon</p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Expert rankings and season projections for {player.name} will be available here.
              </p>
            </div>
          </CardContent>
        </Card>

        {relatedPlayers && relatedPlayers.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-related-heading">
                Related {player.position}s
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedPlayers.map((rp) => (
                <Link key={rp.id} href={`/nfl/players/${rp.slug}/`}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-related-${rp.slug}`}>
                    <CardContent className="p-3 flex items-center gap-3 flex-wrap">
                      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                        <span className="text-[10px] font-bold text-muted-foreground">{rp.position}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{rp.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] px-1.5 py-0 ${POSITION_COLORS[rp.position || ""] || ""}`}
                          >
                            {rp.position}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{rp.team}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/rankings/">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-link-rankings">
              <CardContent className="p-4 flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md bg-primary/10">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Rankings</p>
                  <p className="text-xs text-muted-foreground">Fantasy rankings</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/tools/">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-link-tools">
              <CardContent className="p-4 flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md bg-primary/10">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Tools</p>
                  <p className="text-xs text-muted-foreground">Analysis tools</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/articles/">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-link-articles">
              <CardContent className="p-4 flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md bg-primary/10">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Articles</p>
                  <p className="text-xs text-muted-foreground">Expert analysis</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      <footer className="border-t bg-card mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          StatChasers - Fantasy Football Intelligence
        </div>
      </footer>
    </div>
  );
}
