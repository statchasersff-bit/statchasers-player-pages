import type { Express } from "express";
import type { PlayerInjuryHistory } from "./injurySource";

type Accessor = (name: string, playerId: string) => Promise<PlayerInjuryHistory | null>;

export function registerInjuryRoute(app: Express, getPlayerInjuryHistory: Accessor) {
  app.get("/api/players/:playerId/injuries", async (req, res) => {
    try {
      const { playerId } = req.params;
      const name = String(req.query.name ?? "").trim();
      if (!playerId) return res.status(400).json({ error: "playerId is required" });
      if (!name) return res.status(400).json({ error: "name is required" });
      const injuries = await getPlayerInjuryHistory(name, playerId);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.json({ playerId, injuries });
    } catch (err: any) {
      console.error("[Player/injuries] error:", err);
      res.status(502).json({ error: err?.message || "Failed to load injury history" });
    }
  });
}
