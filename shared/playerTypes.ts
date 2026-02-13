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
}
