import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Resume from "@/pages/resume";
import CustomCursor from "@/components/ui/CustomCursor";
import BlueprintOverlay from "@/components/ui/BlueprintOverlay";
import BlueprintHint from "@/components/ui/BlueprintHint";
import BlueprintCornerTrigger from "@/components/ui/BlueprintCornerTrigger";
import BlobBackground from "@/components/ui/BlobBackground";
import Layout from "@/components/layout/Layout";
import { useBlueprintMode } from "@/hooks/use-blueprint-mode";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/resume" component={Resume} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isBlueprint, toggle } = useBlueprintMode();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <BlobBackground isBlueprint={isBlueprint} />
          <CustomCursor isBlueprint={isBlueprint} />
          <BlueprintHint isBlueprint={isBlueprint} />
          <BlueprintCornerTrigger isBlueprint={isBlueprint} onActivate={toggle} />
          <AnimatePresence>
            {isBlueprint && <BlueprintOverlay key="blueprint" />}
          </AnimatePresence>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
