
import { Resources } from "../types/game";
import { Diamond, Star, Coins } from "lucide-react";

interface ResourceBarProps {
  resources: Resources;
}

const ResourceBar: React.FC<ResourceBarProps> = ({ resources }) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-game-background border-b border-game-muted">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-game-gold mr-1" />
          <span className="text-sm font-medium text-game-gold">{resources.gold.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="h-4 w-4 text-game-favor mr-1" />
          <span className="text-sm font-medium text-game-favor">
            {resources.favor}/{resources.maxFavor}
          </span>
        </div>
        
        {resources.diamonds !== undefined && (
          <div className="flex items-center">
            <Diamond className="h-4 w-4 text-blue-300 mr-1" />
            <span className="text-sm font-medium text-blue-300">{resources.diamonds}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceBar;
