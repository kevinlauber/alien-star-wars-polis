
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, BuildingType } from "../types/game";
import { getBuildingName, getBuildingDescription, calculateConstructionTime, formatTime } from "../data/mockData";

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  building?: Building | null;
  onUpgradeBuilding: (buildingId: string) => void;
  onBuildNew: (type: BuildingType, position: { x: number; y: number }) => void;
  emptyPosition?: { x: number; y: number };
  canAfford: boolean;
}

const BuildingModal: React.FC<BuildingModalProps> = ({
  isOpen,
  onClose,
  building,
  onUpgradeBuilding,
  onBuildNew,
  emptyPosition,
  canAfford
}) => {
  // For new building
  const buildingTypes = Object.values(BuildingType).filter(type => type !== BuildingType.CAPITOL);
  
  const handleUpgrade = () => {
    if (building) {
      onUpgradeBuilding(building.id);
      onClose();
    }
  };
  
  const handleBuildNew = (type: BuildingType) => {
    if (emptyPosition) {
      onBuildNew(type, emptyPosition);
      onClose();
    }
  };
  
  if (!building && !emptyPosition) return null;
  
  const nextLevel = building ? building.level + 1 : 1;
  const constructionTime = formatTime(calculateConstructionTime(nextLevel));
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-game-background border-game-muted text-game-foreground">
        <DialogHeader>
          <DialogTitle>
            {building 
              ? `${getBuildingName(building.type)} (Level ${building.level})`
              : "Construct New Building"}
          </DialogTitle>
          <DialogDescription>
            {building 
              ? getBuildingDescription(building.type)
              : "Choose a building type to construct:"}
          </DialogDescription>
        </DialogHeader>
        
        {building ? (
          <div className="space-y-4">
            <div className="border border-game-muted rounded p-3 bg-opacity-30 bg-black">
              <h4 className="font-medium mb-1">Status</h4>
              {building.isDamaged ? (
                <p className="text-sm text-game-damage">Damaged: Repair required</p>
              ) : building.isConstructing ? (
                <p className="text-sm text-game-secondary">Under construction</p>
              ) : (
                <p className="text-sm text-game-health">Operational</p>
              )}
            </div>
            
            {!building.isConstructing && !building.isDamaged && (
              <div className="border border-game-muted rounded p-3 bg-opacity-30 bg-black">
                <h4 className="font-medium mb-1">Upgrade to Level {building.level + 1}</h4>
                <p className="text-sm">Time: {constructionTime}</p>
                <p className="text-sm">Cost: 1000 Gold</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {buildingTypes.map((type) => (
              <div 
                key={type}
                className="border border-game-muted rounded p-3 bg-opacity-30 bg-black hover:bg-opacity-50 cursor-pointer"
                onClick={() => emptyPosition && handleBuildNew(type)}
              >
                <h4 className="font-medium">{getBuildingName(type)}</h4>
                <p className="text-xs text-game-muted mt-1">{getBuildingDescription(type)}</p>
                <p className="text-xs mt-2">Cost: 500 Gold</p>
                <p className="text-xs">Time: {formatTime(calculateConstructionTime(1))}</p>
              </div>
            ))}
          </div>
        )}
        
        <DialogFooter>
          {building && !building.isConstructing && !building.isDamaged && (
            <Button
              onClick={handleUpgrade}
              disabled={!canAfford}
              className="bg-game-primary hover:bg-blue-600"
            >
              {canAfford ? "Upgrade" : "Not Enough Gold"}
            </Button>
          )}
          
          {building && building.isDamaged && (
            <Button
              onClick={handleUpgrade}
              disabled={!canAfford}
              className="bg-game-primary hover:bg-blue-600"
            >
              {canAfford ? "Repair" : "Not Enough Gold"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingModal;
