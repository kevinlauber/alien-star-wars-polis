
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBuildings, mockCity } from "../data/mockData";
import ResourceBar from "../components/ResourceBar";
import BuildingGrid from "../components/BuildingGrid";
import BuildingModal from "../components/BuildingModal";
import { Building, BuildingType } from "../types/game";
import { Button } from "@/components/ui/button";
import { Map, Users, Settings } from "lucide-react";

const CityView = () => {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState(mockBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [emptyPosition, setEmptyPosition] = useState<{x: number, y: number} | undefined>(undefined);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  
  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setEmptyPosition(undefined);
    setIsBuildingModalOpen(true);
  };
  
  const handleEmptySpaceClick = (position: {x: number, y: number}) => {
    setSelectedBuilding(null);
    setEmptyPosition(position);
    setIsBuildingModalOpen(true);
  };
  
  const handleUpgradeBuilding = (buildingId: string) => {
    // In a real app, this would call an API
    console.log(`Upgrading building ${buildingId}`);
    setIsBuildingModalOpen(false);
  };
  
  const handleBuildNew = (type: BuildingType, position: {x: number, y: number}) => {
    // In a real app, this would call an API
    console.log(`Building new ${type} at position ${position.x},${position.y}`);
    setIsBuildingModalOpen(false);
  };
  
  return (
    <div className="h-full flex flex-col starpolis-bg">
      <div className="flex justify-between items-center p-2 border-b border-game-muted">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {}}
        >
          <Settings className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Starpolis</h1>
        <div className="w-5"></div> {/* Placeholder for alignment */}
      </div>
      
      <ResourceBar resources={mockCity.resources} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">{mockCity.name} (Level {mockCity.level})</h2>
            <div className="flex items-center">
              <div className="text-sm mr-2">Health: {mockCity.health}%</div>
              <div className="w-20 h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-game-health rounded-full" 
                  style={{ width: `${mockCity.health}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <BuildingGrid 
            buildings={buildings}
            onBuildingClick={handleBuildingClick}
          />
        </div>
      </div>
      
      <div className="border-t border-game-muted grid grid-cols-3 p-2">
        <Button
          variant="ghost"
          onClick={() => navigate('/alien')}
          className="flex flex-col items-center"
        >
          <Users className="h-5 w-5 mb-1" />
          <span className="text-xs">Aliens</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center"
          onClick={() => navigate('/build')}
        >
          <span className="mb-1 text-lg font-bold">+</span>
          <span className="text-xs">Build</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center"
          onClick={() => navigate('/map')}
        >
          <Map className="h-5 w-5 mb-1" />
          <span className="text-xs">Map</span>
        </Button>
      </div>
      
      <BuildingModal
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        building={selectedBuilding}
        emptyPosition={emptyPosition}
        onUpgradeBuilding={handleUpgradeBuilding}
        onBuildNew={handleBuildNew}
        canAfford={true} // In a real app, check if the player has enough resources
      />
    </div>
  );
};

export default CityView;
