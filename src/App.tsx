
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import CityView from "./pages/CityView";
import AlienPage from "./pages/AlienPage";
import WorldMapPage from "./pages/WorldMapPage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a client inside the component to ensure it's created within React's lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/city" element={<CityView />} />
            <Route path="/alien" element={<AlienPage />} />
            <Route path="/map" element={<WorldMapPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
