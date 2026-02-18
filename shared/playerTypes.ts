export interface GameLogStats {
  pts_ppr: number;
  pts_half_ppr?: number | null;
  pass_att?: number;
  pass_cmp?: number;
  pass_yd?: number;
  pass_td?: number;
  pass_int?: number;
  rush_att?: number;
  rush_yd?: number;
  rush_td?: number;
  rec_tgt?: number;
  rec?: number;
  rec_yd?: number;
  rec_td?: number;
  fgm?: number;
  fga?: number;
  fgm_lng?: number;
  xpm?: number;
  xpa?: number;
}

export interface GameLogEntry {
  week: number;
  opp: string;
  stats: GameLogStats;
  pos_rank?: number | null;
  opp_rank_vs_pos?: number | null;
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
  number: number | null;
  depth_chart_order: number | null;
  years_exp: number | null;
  headshotUrl: string | null;
  season: number;
  trends: PlayerTrends | null;
  gameLog: GameLogEntry[];
  news: NewsEntry[];
}
