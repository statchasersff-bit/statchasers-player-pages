import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PlayerSearch from "@/pages/player-search";
import PlayerProfile from "@/pages/player-profile";
import Placeholder from "@/pages/placeholder";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nfl/players" component={PlayerSearch} />
      <Route path="/nfl/players/:slug" component={PlayerProfile} />
      <Route path="/nfl/players/:slug/" component={PlayerProfile} />
      <Route path="/rankings" component={Placeholder} />
      <Route path="/rankings/" component={Placeholder} />
      <Route path="/tools" component={Placeholder} />
      <Route path="/tools/" component={Placeholder} />
      <Route path="/articles" component={Placeholder} />
      <Route path="/articles/" component={Placeholder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
