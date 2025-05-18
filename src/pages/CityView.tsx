
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResourceBar from '@/components/ResourceBar';
import MedievalBuilding from '@/components/MedievalBuilding';
import { Building, BuildingType } from '@/types/game';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock data
const mockBuildings: Building[] = [
  {
    id: '1',
    type: BuildingType.CAPITOL,
    level: 3,
    position: { x: 2, y: 2 },
    isCapitol: true,
    isDamaged: false
  },
  {
    id: '2',
    type: BuildingType.GOLD_MINE,
    level: 2,
    position: { x: 1, y: 1 },
    isCapitol: false,
    isDamaged: false
  },
  {
    id: '3',
    type: BuildingType.FAVOR_SHRINE,
    level: 1,
    position: { x: 3, y: 1 },
    isCapitol: false,
    isDamaged: false
  },
  {
    id: '4',
    type: BuildingType.DEFENSE_TOWER,
    level: 2,
    position: { x: 4, y: 3 },
    isCapitol: false,
    isDamaged: false
  },
  {
    id: '5',
    type: BuildingType.LABORATORY,
    level: 1,
    position: { x: 1, y: 3 },
    isCapitol: false,
    isDamaged: true
  },
  {
    id: '6',
    type: BuildingType.GOLD_MINE,
    level: 1,
    position: { x: 3, y: 4 },
    isCapitol: false,
    isDamaged: false,
    isConstructing: true,
    constructionEndTime: new Date(Date.now() + 3600000)
  }
];

const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};

const CityView = () => {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setIsDialogOpen(true);
  };
  
  const getBuildingCost = (type: string, level: number) => {
    const baseCost = {
      [BuildingType.CAPITOL]: 1000,
      [BuildingType.GOLD_MINE]: 500,
      [BuildingType.FAVOR_SHRINE]: 800,
      [BuildingType.DEFENSE_TOWER]: 600,
      [BuildingType.LABORATORY]: 1200
    };
    
    return (baseCost[type as BuildingType] || 500) * Math.pow(1.5, level);
  };
  
  const formatTime = (timeInMs: number) => {
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 24);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#34495e] bg-opacity-50">
      <ResourceBar resources={mockResources} />
      
      <div className="medieval-header px-4 py-2 flex items-center justify-between">
        <div className="text-lg font-semibold">City Name</div>
        <div className="text-sm">Level 3 • Health: 100%</div>
      </div>
      
      <div className="flex-1 relative bg-[#8d744a] bg-opacity-30 p-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/medieval-background.jpg')] opacity-20 bg-cover bg-center"></div>
        </div>
        
        {/* City grid */}
        <div className="relative w-full h-full min-h-[500px]">
          {mockBuildings.map(building => (
            <MedievalBuilding 
              key={building.id} 
              building={building}
              onClick={handleBuildingClick}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="grid grid-cols-4 gap-1 p-2 bg-[#1a3057]">
        <Button 
          className="medieval-button"
          onClick={() => navigate('/alien')}
        >
          Aliens
        </Button>
        <Button 
          className="medieval-button"
          onClick={() => navigate('/map')}
        >
          World Map
        </Button>
        <Button className="medieval-button">
          Build New
        </Button>
        <Button className="medieval-button">
          Alliance
        </Button>
      </div>
      
      {/* Building detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="medieval-panel max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-[#4a3e1b] capitalize">
              {selectedBuilding?.type.replace('_', ' ')} - Level {selectedBuilding?.level}
            </DialogTitle>
          </DialogHeader>
          
          <DialogDescription className="text-[#4a3e1b]">
            {selectedBuilding?.isConstructing ? (
              <div className="space-y-4">
                <p>This building is under construction.</p>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
                </div>
                <p className="text-center">
                  Time remaining: {selectedBuilding?.constructionEndTime && 
                                   formatTime(selectedBuilding.constructionEndTime.getTime() - Date.now())}
                </p>
                <p className="text-center mt-4">
                  <Button className="medieval-button">
                    Speed Up (5 diamonds)
                  </Button>
                </p>
              </div>
            ) : selectedBuilding?.isDamaged ? (
              <div className="space-y-4">
                <p>This building is damaged and needs repair.</p>
                <p className="text-center mt-4">
                  <Button className="medieval-button">
                    Repair (1000 gold)
                  </Button>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  {selectedBuilding?.type === BuildingType.CAPITOL && "Main building of your city. Upgrade to unlock new buildings."}
                  {selectedBuilding?.type === BuildingType.GOLD_MINE && "Produces gold over time. Gold is used to construct and upgrade buildings."}
                  {selectedBuilding?.type === BuildingType.FAVOR_SHRINE && "Generates favor with alien factions. Favor is used to interact with aliens."}
                  {selectedBuilding?.type === BuildingType.DEFENSE_TOWER && "Protects your city from attacks. Higher levels provide better protection."}
                  {selectedBuilding?.type === BuildingType.LABORATORY && "Research new technologies to improve your civilization."}
                </p>
                
                <div className="border border-[#c8b372] p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>Current Production:</div>
                    <div>
                      {selectedBuilding?.type === BuildingType.GOLD_MINE && `${100 * selectedBuilding.level} gold/hour`}
                      {selectedBuilding?.type === BuildingType.FAVOR_SHRINE && `${5 * selectedBuilding.level} favor/day`}
                      {selectedBuilding?.type === BuildingType.DEFENSE_TOWER && `${10 * selectedBuilding.level}% defense`}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div>Next Level Production:</div>
                    <div>
                      {selectedBuilding?.type === BuildingType.GOLD_MINE && `${100 * (selectedBuilding.level + 1)} gold/hour`}
                      {selectedBuilding?.type === BuildingType.FAVOR_SHRINE && `${5 * (selectedBuilding.level + 1)} favor/day`}
                      {selectedBuilding?.type === BuildingType.DEFENSE_TOWER && `${10 * (selectedBuilding.level + 1)}% defense`}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p>
                    Upgrade to level {selectedBuilding?.level && selectedBuilding.level + 1}
                  </p>
                  <p>
                    Cost: {selectedBuilding && Math.floor(getBuildingCost(selectedBuilding.type, selectedBuilding.level))} gold
                  </p>
                  <p>
                    Time: {selectedBuilding?.level && formatTime(10 * 60 * 1000 * Math.pow(2, selectedBuilding.level))}
                  </p>
                </div>
              </div>
            )}
          </DialogDescription>
          
          <DialogFooter className="flex justify-center space-x-2">
            {!selectedBuilding?.isConstructing && !selectedBuilding?.isDamaged && (
              <Button className="medieval-button">
                Upgrade
              </Button>
            )}
            <Button 
              variant="outline"
              className="border-[#c8b372] text-[#4a3e1b]"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CityView;
