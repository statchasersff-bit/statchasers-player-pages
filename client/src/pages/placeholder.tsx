import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, Search } from "lucide-react";

const PAGE_INFO: Record<string, { title: string; description: string }> = {
  "/rankings/": { title: "Fantasy Rankings", description: "Weekly and season-long fantasy football rankings coming soon." },
  "/tools/": { title: "Fantasy Tools", description: "Trade analyzer, draft simulator, and more coming soon." },
  "/articles/": { title: "Articles & Analysis", description: "Expert analysis and waiver wire insights coming soon." },
};

export default function Placeholder() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const info = PAGE_INFO[path] || { title: "Coming Soon", description: "This page is under construction." };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/">
            <span className="text-lg font-bold tracking-tight text-foreground">StatChasers</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Construction className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-page-title">{info.title}</h1>
        <p className="text-muted-foreground mb-8">{info.description}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/">
            <Button variant="outline" data-testid="button-home">Home</Button>
          </Link>
          <Link href="/nfl/players">
            <Button data-testid="button-search-players">
              <Search className="w-4 h-4 mr-2" />
              Search Players
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
