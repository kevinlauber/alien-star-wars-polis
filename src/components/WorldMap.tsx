
import { Island } from "../types/game";

interface WorldMapProps {
  islands: Island[];
  onIslandSelect: (island: Island) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ islands, onIslandSelect }) => {
  const gridSize = 10;
  
  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-medium mb-4">World Map</h2>
      
      <div className="relative flex-1 border border-game-muted rounded bg-game-background overflow-hidden">
        <div className="absolute inset-0 starfield opacity-30">
          {/* Star background effect */}
          {Array(50).fill(0).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse-glow"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Islands */}
        <div className="relative p-4 h-full">
          {islands.map((island) => {
            const { x, y } = island.position;
            const posX = (x / gridSize) * 100;
            const posY = (y / gridSize) * 100;
            
            // Determine island class based on status
            let islandClass = 'island-empty';
            if (island.isDestroyed) {
              islandClass = 'island-destroyed';
            } else if (island.isOwn) {
              islandClass = 'island-own';
            } else if (island.ownerName) {
              islandClass = 'island-enemy';
            }
            
            return (
              <div
                key={island.id}
                className={`island absolute w-6 h-6 flex items-center justify-center cursor-pointer ${islandClass}`}
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => onIslandSelect(island)}
              >
                <span className="text-xs font-bold">
                  {island.isDestroyed ? 'X' : island.isOwn ? '✓' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 border border-game-muted rounded p-2 bg-black bg-opacity-30">
        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full island-own mr-2"></div>
            <span>Your Islands</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full island-enemy mr-2"></div>
            <span>Enemy Islands</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full island-destroyed mr-2"></div>
            <span>Destroyed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full island-empty mr-2"></div>
            <span>Unclaimed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
