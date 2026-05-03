import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Resume from "@/pages/resume";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BuildingVirtualRobots from "@/pages/blog/building-virtual-robots";
import IWasFeaturedOnMitmeche from "@/pages/blog/i-was-featured-on-mitmeche";
import MovingThingsWithAdobeAnimate from "@/pages/blog/moving-things-with-adobe-animate";
import Thesis from "@/pages/projects/thesis";
import MedicalDevice from "@/pages/projects/2-750";
import ReVise from "@/pages/projects/revise";
import ZoomYoyo from "@/pages/projects/zoom-yoyo";
import Macarons from "@/pages/projects/macarons";
import DesignObjects from "@/pages/projects/4-031";
import SoftRobotics from "@/pages/projects/soft-robotics";
import SocialRobot from "@/pages/projects/social-robot";
import ToyCushions from "@/pages/projects/toy-cushions";
import Exhibition from "@/pages/projects/exhibition";
import DesignIntensive from "@/pages/projects/design-intensive";
import Videos from "@/pages/projects/videos";
import BrushlessMotor from "@/pages/projects/brushless-motor";
import Penguino from "@/pages/projects/penguino";
import MakeMIT from "@/pages/projects/makemit";
import WateringCans from "@/pages/projects/watering-cans";
import CustomCursor from "@/components/ui/CustomCursor";
import BlueprintOverlay from "@/components/ui/BlueprintOverlay";
import BlueprintHint from "@/components/ui/BlueprintHint";
import BlueprintCornerTrigger from "@/components/ui/BlueprintCornerTrigger";
import BlobBackground from "@/components/ui/BlobBackground";
import StickyNote from "@/components/StickyNote";
import Layout from "@/components/layout/Layout";
import { useBlueprintMode } from "@/hooks/use-blueprint-mode";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/resume" component={Resume} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/building-virtual-robots" component={BuildingVirtualRobots} />
      <Route path="/blog/i-was-featured-on-mitmeche" component={IWasFeaturedOnMitmeche} />
      <Route path="/blog/moving-things-with-adobe-animate" component={MovingThingsWithAdobeAnimate} />
      <Route path="/projects/thesis" component={Thesis} />
      <Route path="/projects/2-750" component={MedicalDevice} />
      <Route path="/projects/revise" component={ReVise} />
      <Route path="/projects/zoom-yoyo" component={ZoomYoyo} />
      <Route path="/projects/macarons" component={Macarons} />
      <Route path="/projects/4-031" component={DesignObjects} />
      <Route path="/projects/soft-robotics" component={SoftRobotics} />
      <Route path="/projects/social-robot" component={SocialRobot} />
      <Route path="/projects/toy-cushions" component={ToyCushions} />
      <Route path="/projects/exhibition" component={Exhibition} />
      <Route path="/projects/design-intensive" component={DesignIntensive} />
      <Route path="/projects/videos" component={Videos} />
      <Route path="/projects/brushless-motor" component={BrushlessMotor} />
      <Route path="/projects/penguino" component={Penguino} />
      <Route path="/projects/makemit" component={MakeMIT} />
      <Route path="/projects/watering-cans" component={WateringCans} />
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
          <StickyNote />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
