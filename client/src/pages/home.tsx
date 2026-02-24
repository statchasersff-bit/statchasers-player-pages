import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Layers,
  Target,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    title: "Player Database",
    description: "Advanced profiles with efficiency metrics, weekly finish rates, and role trends for every fantasy-relevant player.",
    icon: Users,
  },
  {
    title: "Weekly Finish Analytics",
    description: "Positional finish rates, bust percentages, volatility scores, and consistency tracking across formats.",
    icon: BarChart3,
  },
  {
    title: "Role Intelligence",
    description: "Opportunity shifts, usage momentum, depth chart movement, and role stability scoring.",
    icon: TrendingUp,
  },
  {
    title: "Dynasty Context",
    description: "Multi-year career arcs, trade values, draft capital data, and long-term trajectory analysis.",
    icon: Layers,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Search a Player",
    description: "Find any fantasy-relevant NFL player across all 32 teams.",
    icon: Search,
  },
  {
    number: "02",
    title: "Analyze Role & Efficiency",
    description: "Dive into weekly finishes, usage trends, and advanced metrics.",
    icon: Target,
  },
  {
    number: "03",
    title: "Gain the Edge",
    description: "Make informed roster decisions backed by data, not hype.",
    icon: Zap,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">

        <section className="sc-home-hero" data-testid="hero-section">
          <div className="sc-home-hero__gold-line" />
          <div className="sc-home-hero__inner">
            <h1 className="sc-home-hero__title" data-testid="text-hero-title">
              Player Search
            </h1>
            <div className="sc-home-hero__accent" />
            <p className="sc-home-hero__sub" data-testid="text-hero-subtitle">
              Data-driven player profiles, weekly finish analytics, and role intelligence — built for competitive fantasy football.
            </p>
            <div className="sc-home-hero__actions">
              <Link href="/nfl/players">
                <Button className="sc-home-hero__cta-primary" size="lg" data-testid="button-hero-search">
                  Search Players
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/nfl/players">
                <Button variant="outline" className="sc-home-hero__cta-secondary" size="lg" data-testid="button-hero-browse">
                  Browse All Teams
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="sc-home-steps" data-testid="steps-section">
          <div className="sc-home-steps__inner">
            <h2 className="sc-home-section-title" data-testid="text-steps-title">
              How It Works
            </h2>
            <div className="sc-home-section-accent" />
            <div className="sc-home-steps__grid">
              {STEPS.map((step) => (
                <div key={step.number} className="sc-home-step" data-testid={`step-${step.number}`}>
                  <div className="sc-home-step__number">{step.number}</div>
                  <div className="sc-home-step__icon">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="sc-home-step__title">{step.title}</h3>
                  <p className="sc-home-step__desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sc-home-features" data-testid="features-section">
          <div className="sc-home-features__inner">
            <h2 className="sc-home-section-title" data-testid="text-features-title">
              What You Get
            </h2>
            <div className="sc-home-section-accent" />
            <div className="sc-home-features__grid">
              {FEATURES.map((item) => (
                <div key={item.title} className="sc-feature" data-testid={`card-feature-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="sc-feature__icon">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="sc-feature__title">{item.title}</h3>
                  <p className="sc-feature__desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sc-home-bottom-cta" data-testid="bottom-cta-section">
          <div className="sc-home-bottom-cta__inner">
            <div className="sc-home-bottom-cta__accent" />
            <p className="sc-home-bottom-cta__text">
              Search and analyze every fantasy-relevant NFL player with advanced metrics built for serious managers.
            </p>
            <Link href="/nfl/players">
              <Button className="sc-home-hero__cta-primary" size="lg" data-testid="button-bottom-search">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
