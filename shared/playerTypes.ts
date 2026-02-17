export interface GameLogEntry {
  week: number;
  opp: string;
  result: string;
  fantasyPts: number;
  detailsUrl?: string;
}

export interface NewsEntry {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  summary?: string;
}

export interface PlayerTrends {
  weeklyFantasyPoints: number[];
}

export interface Player {
  id: string;
  name: string;
  slug: string;
  position: string | null;
  team: string | null;
  status: string | null;
  injury_status: string | null;
  age: number | null;
  height: string | null;
  weight: string | null;
  depth_chart_order: number | null;
  years_exp: number | null;
  headshotUrl: string | null;
  season: number;
  trends: PlayerTrends | null;
  gameLog: GameLogEntry[];
  news: NewsEntry[];
}
