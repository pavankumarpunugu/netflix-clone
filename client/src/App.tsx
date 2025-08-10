import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ContentDetail from "@/pages/content-detail";
import Movies from "@/pages/movies";
import TVShows from "@/pages/tv-shows";
import Search from "@/pages/search";
import MyList from "@/pages/my-list";
import Browse from "@/pages/browse";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movies" component={Movies} />
      <Route path="/tv-shows" component={TVShows} />
      <Route path="/my-list" component={MyList} />
      <Route path="/browse" component={Browse} />
      <Route path="/search/:query" component={Search} />
      <Route path="/content/:id" component={ContentDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
