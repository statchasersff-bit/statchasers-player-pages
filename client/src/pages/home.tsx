import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, FileText, Trophy, Users, TrendingUp } from "lucide-react";

const NAV_LINKS = [
  {
    title: "Player Database",
    description: "Search and browse fantasy profiles for every NFL player",
    href: "/nfl/players",
    icon: Users,
  },
  {
    title: "Rankings",
    description: "Weekly and season-long fantasy football rankings",
    href: "/rankings/",
    icon: Trophy,
  },
  {
    title: "Tools",
    description: "Trade analyzer, draft simulator, and more",
    href: "/tools/",
    icon: BarChart3,
  },
  {
    title: "Articles",
    description: "Expert analysis, waiver wire targets, and matchup breakdowns",
    href: "/articles/",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight text-foreground" data-testid="link-home-logo">
              StatChasers
            </span>
          </Link>
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/nfl/players">
              <Button variant="ghost" size="sm" data-testid="link-nav-players">
                <Search className="w-4 h-4 mr-1" />
                Players
              </Button>
            </Link>
            <Link href="/rankings/">
              <Button variant="ghost" size="sm" data-testid="link-nav-rankings">Rankings</Button>
            </Link>
            <Link href="/tools/">
              <Button variant="ghost" size="sm" data-testid="link-nav-tools">Tools</Button>
            </Link>
            <Link href="/articles/">
              <Button variant="ghost" size="sm" data-testid="link-nav-articles">Articles</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" data-testid="text-hero-title">
                StatChasers
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-hero-subtitle">
              Your edge in fantasy football. Player profiles, advanced stats, trends, and insights for every NFL player.
            </p>
            <Link href="/nfl/players">
              <Button size="lg" data-testid="button-hero-search">
                <Search className="w-4 h-4 mr-2" />
                Search Players
              </Button>
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-card mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          StatChasers - Fantasy Football Intelligence
        </div>
      </footer>
    </div>
  );
}
