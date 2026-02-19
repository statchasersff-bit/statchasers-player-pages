import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Users, BarChart3, TrendingUp, Brain } from "lucide-react";

const FEATURES = [
  {
    title: "Player Database",
    description: "Advanced profiles with efficiency, weekly finish rates, and role trends.",
    icon: Users,
  },
  {
    title: "Weekly Finish Metrics",
    description: "WR1/WR2 rates, bust %, volatility, and consistency tracking.",
    icon: BarChart3,
  },
  {
    title: "Trend & Role Tracking",
    description: "Opportunity shifts, usage movement, and momentum scoring.",
    icon: TrendingUp,
  },
  {
    title: "Fantasy Context",
    description: "Career arcs, multi-year profiles, and role evolution.",
    icon: Brain,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
          <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5" data-testid="text-hero-title">
              StatChasers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed" data-testid="text-hero-subtitle">
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

        <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((item) => (
              <Card key={item.title} className="h-full" data-testid={`card-feature-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
