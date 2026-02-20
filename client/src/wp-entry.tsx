import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryFunction } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import PlayerProfile from "@/pages/player-profile";
import PlayerSearch from "@/pages/player-search";
import "./wp-index.css";

declare global {
  interface Window {
    scPlayersConfig?: {
      restUrl?: string;
      baseUrl?: string;
      indexedUrl?: string;
      apiBaseUrl?: string;
    };
  }
}

const config = window.scPlayersConfig || {};
const STATIC_BASE = "https://statchasersff-bit.github.io/statchasers-player-pages/data";

function mapApiToStatic(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin);
    const pathname = parsed.pathname;
    const params = parsed.searchParams;

    if (pathname === "/api/players" || pathname === "/api/players/") {
      return `${STATIC_BASE}/players.json`;
    }

    if (pathname === "/api/indexed-players" || pathname === "/api/indexed-players/") {
      return `${STATIC_BASE}/indexed-players.json`;
    }

    const profileMatch = pathname.match(/^\/api\/players\/([^/]+)\/?$/);
    if (profileMatch) {
      const slug = profileMatch[1];
      const format = params.get("format") || "ppr";
      return `${STATIC_BASE}/players/${slug}/profile-${format}.json`;
    }

    const gameLogMatch = pathname.match(/^\/api\/players\/([^/]+)\/game-log\/?$/);
    if (gameLogMatch) {
      const slug = gameLogMatch[1];
      const season = params.get("season") || "2025";
      const format = params.get("format") || "ppr";
      return `${STATIC_BASE}/players/${slug}/game-log-${season}-${format}.json`;
    }

    const relatedMatch = pathname.match(/^\/api\/players\/([^/]+)\/related\/?$/);
    if (relatedMatch) {
      const slug = relatedMatch[1];
      const format = params.get("format") || "ppr";
      return `${STATIC_BASE}/players/${slug}/related-${format}.json`;
    }

    const newsMatch = pathname.match(/^\/api\/players\/([^/]+)\/news\/?$/);
    if (newsMatch) {
      return "data:application/json,[]";
    }
  } catch {}

  if (config.apiBaseUrl) {
    const base = config.apiBaseUrl.replace(/\/+$/, "");
    return base + url;
  }
  return url;
}

function rewriteUrl(url: string): string {
  if (url.startsWith("/api/")) {
    return mapApiToStatic(url);
  }
  return url;
}

const originalFetch = window.fetch.bind(window);
window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (typeof input === "string") {
    input = rewriteUrl(input);
  } else if (input instanceof Request) {
    const fullUrl = input.url;
    const origin = window.location.origin;
    const pathname = fullUrl.startsWith(origin) ? fullUrl.slice(origin.length) : fullUrl;
    if (pathname.startsWith("/api/")) {
      const rewritten = rewriteUrl(pathname);
      input = new Request(rewritten, input);
    }
  } else if (input instanceof URL) {
    if (input.pathname.startsWith("/api/")) {
      input = rewriteUrl(input.pathname + input.search);
    }
  }
  return originalFetch(input, init);
};

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const url = queryKey.join("/");
  const fullUrl = rewriteUrl(url);
  const res = await originalFetch(fullUrl);
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const useWPLocation = (): [string, (to: string) => void] => {
  const path = window.location.pathname + window.location.search;
  return [path, (to: string) => { window.location.href = to; }];
};

const mountPoint = document.querySelector(".scpp-root");
if (mountPoint) {
  mountPoint.innerHTML = "";

  createRoot(mountPoint).render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router hook={useWPLocation}>
          <Switch>
            <Route path="/nfl/players/:slug" component={PlayerProfile} />
            <Route path="/nfl/players/:slug/" component={PlayerProfile} />
            <Route path="/nfl/players" component={PlayerSearch} />
            <Route path="/nfl/players/" component={PlayerSearch} />
          </Switch>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
