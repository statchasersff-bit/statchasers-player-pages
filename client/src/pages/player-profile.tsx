import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { useEffect } from "react";
import type { Player } from "@shared/playerTypes";

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

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground text-sm" data-testid={`text-snapshot-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {value ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

function PlayerProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-5 w-32 mb-8" />
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
    if (player) {
      document.title = `${player.name} Fantasy Football Profile | StatChasers`;
    }
    return () => {
      document.title = "StatChasers";
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
          <div className="flex items-center gap-3 mb-2 flex-wrap">
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
            {player.team ? `${player.team}` : "Free Agent"} {player.position ? `| ${player.position}` : ""}
          </p>
        </div>

        {player.injury_status && (
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2 mb-4">
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
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-trends-heading">Trends</h2>
            </div>
            <div className="rounded-md border border-dashed border-muted-foreground/25 p-8 text-center">
              <TrendingUp className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">Trend data coming soon</p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Week-over-week fantasy scoring trends for {player.name} will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Table className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-gamelog-heading">Game Log</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-4 text-muted-foreground font-medium">Week</th>
                    <th className="py-2 pr-4 text-muted-foreground font-medium">Opp</th>
                    <th className="py-2 pr-4 text-muted-foreground font-medium">Result</th>
                    <th className="py-2 pr-4 text-muted-foreground font-medium">Fantasy Pts</th>
                    <th className="py-2 text-muted-foreground font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-6 text-center text-muted-foreground/70 text-xs" colSpan={5}>
                      Game log data will be available once the season begins.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-news-heading">Articles & News</h2>
            </div>
            <div className="rounded-md border border-dashed border-muted-foreground/25 p-8 text-center">
              <Newspaper className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">No articles yet</p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                News and analysis related to {player.name} will appear here as they are published.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
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
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground" data-testid="text-related-heading">
                  Related {player.position}s
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedPlayers.map((rp) => (
                  <Link key={rp.id} href={`/nfl/players/${rp.slug}/`}>
                    <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-related-${rp.slug}`}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                          <span className="text-[10px] font-bold text-muted-foreground">{rp.position}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{rp.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
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
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/rankings/">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-link-rankings">
              <CardContent className="p-4 flex items-center gap-3">
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
              <CardContent className="p-4 flex items-center gap-3">
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
              <CardContent className="p-4 flex items-center gap-3">
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
