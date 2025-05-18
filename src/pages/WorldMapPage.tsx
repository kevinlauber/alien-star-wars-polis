
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockIslands, mockCity } from "../data/mockData";
import ResourceBar from "../components/ResourceBar";
import WorldMap from "../components/WorldMap";
import IslandModal from "../components/IslandModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Island } from "../types/game";
import { toast } from "@/hooks/use-toast";

const WorldMapPage = () => {
  const navigate = useNavigate();
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isIslandModalOpen, setIsIslandModalOpen] = useState(false);
  
  const handleIslandSelect = (island: Island) => {
    setSelectedIsland(island);
    setIsIslandModalOpen(true);
  };

  const handleAttack = () => {
    if (!selectedIsland) return;
    
    // In a real app, this would call an API
    toast({
      title: "Attack Initiated",
      description: `You're attacking ${selectedIsland.ownerName}'s island!`,
    });
    
    setIsIslandModalOpen(false);
  };

  const handleColonize = () => {
    if (!selectedIsland) return;
    
    // In a real app, this would call an API
    toast({
      title: "Colonization Started",
      description: "You've started colonizing a new island!",
    });
    
    setIsIslandModalOpen(false);
  };
  
  return (
    <div className="h-full flex flex-col starpolis-bg">
      <div className="flex items-center p-2 border-b border-game-muted">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1 text-center">World Map</h1>
        <div className="w-5"></div> {/* Placeholder for alignment */}
      </div>
      
      <ResourceBar resources={mockCity.resources} />
      
      <div className="flex-1 overflow-hidden">
        <WorldMap 
          islands={mockIslands} 
          onIslandSelect={handleIslandSelect}
        />
      </div>
      
      <IslandModal
        isOpen={isIslandModalOpen}
        onClose={() => setIsIslandModalOpen(false)}
        island={selectedIsland}
        onAttack={handleAttack}
        onColonize={handleColonize}
      />
    </div>
  );
};

export default WorldMapPage;
