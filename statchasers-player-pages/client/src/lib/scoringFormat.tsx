import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ScoringFormat } from "@shared/scoring";

// Global fantasy scoring preference, shared across the players list and player
// profile pages and persisted to localStorage so the choice survives navigation
// and reloads.
const STORAGE_KEY = "scpp:scoringFormat";
const VALID: ScoringFormat[] = ["standard", "half", "ppr"];

function readInitial(): ScoringFormat {
  if (typeof window === "undefined") return "ppr";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v && (VALID as string[]).includes(v)) return v as ScoringFormat;
  } catch {
    /* localStorage unavailable (private mode, etc.) — fall back to default */
  }
  return "ppr";
}

type ScoringFormatContextValue = {
  format: ScoringFormat;
  setFormat: (f: ScoringFormat) => void;
};

const ScoringFormatContext = createContext<ScoringFormatContextValue | null>(null);

export function ScoringFormatProvider({ children }: { children: ReactNode }) {
  const [format, setFormatState] = useState<ScoringFormat>(readInitial);

  const setFormat = (f: ScoringFormat) => {
    setFormatState(f);
    try {
      window.localStorage.setItem(STORAGE_KEY, f);
    } catch {
      /* ignore persistence failures */
    }
  };

  // Keep the preference in sync if it's changed in another tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && (VALID as string[]).includes(e.newValue)) {
        setFormatState(e.newValue as ScoringFormat);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <ScoringFormatContext.Provider value={{ format, setFormat }}>
      {children}
    </ScoringFormatContext.Provider>
  );
}

export function useScoringFormat(): ScoringFormatContextValue {
  const ctx = useContext(ScoringFormatContext);
  if (!ctx) throw new Error("useScoringFormat must be used within a ScoringFormatProvider");
  return ctx;
}
