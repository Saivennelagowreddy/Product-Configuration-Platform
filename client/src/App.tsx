import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Requirements from "@/pages/Requirements";
import Specifications from "@/pages/Specifications";
import Performance from "@/pages/Performance";
import Compare from "@/pages/Compare";
import Summary from "@/pages/Summary";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/configurator/requirements" component={Requirements} />
        <Route path="/configurator/specifications" component={Specifications} />
        <Route path="/configurator/performance" component={Performance} />
        <Route path="/configurator/compare" component={Compare} />
        <Route path="/configurator/summary" component={Summary} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
