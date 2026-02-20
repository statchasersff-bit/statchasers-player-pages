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
const API_BASE = (config.apiBaseUrl || "").replace(/\/+$/, "");

function rewriteApiUrl(url: string): string {
  if (API_BASE && url.startsWith("/api/")) {
    return API_BASE + url;
  }
  return url;
}

const originalFetch = window.fetch.bind(window);
window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (typeof input === "string") {
    input = rewriteApiUrl(input);
  } else if (input instanceof Request) {
    const rewritten = rewriteApiUrl(input.url);
    if (rewritten !== input.url) {
      input = new Request(rewritten, input);
    }
  } else if (input instanceof URL) {
    const rewritten = rewriteApiUrl(input.pathname);
    if (rewritten !== input.pathname) {
      input = rewritten;
    }
  }
  return originalFetch(input, init);
};

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const url = queryKey.join("/");
  const fullUrl = rewriteApiUrl(url);
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
