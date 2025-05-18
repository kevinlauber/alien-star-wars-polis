
import { useState, useEffect } from "react";
import { Building } from "../types/game";
import { getBuildingName, calculateTimeLeft, formatTime } from "../data/mockData";

interface BuildingGridProps {
  buildings: Building[];
  onBuildingClick: (building: Building) => void;
}

const BuildingGrid: React.FC<BuildingGridProps> = ({ buildings, onBuildingClick }) => {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  
  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, number> = {};
      
      buildings.forEach(building => {
        if (building.isConstructing && building.constructionEndTime) {
          newTimeLeft[building.id] = calculateTimeLeft(building.constructionEndTime);
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [buildings]);
  
  // Create a 5x5 grid
  const gridSize = 5;
  const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(null));
  
  // Place buildings in the grid
  buildings.forEach(building => {
    const { x, y } = building.position;
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      grid[y][x] = building;
    }
  });
  
  return (
    <div className="p-2">
      <div className="grid grid-cols-5 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((building, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={`
                building aspect-square flex items-center justify-center
                ${building?.isCapitol ? 'building-capitol' : ''}
                ${building?.isDamaged ? 'building-damaged' : ''}
                ${building?.isConstructing ? 'building-constructing' : ''}
                ${!building ? 'border-dashed border border-game-muted bg-transparent' : ''}
              `}
              onClick={() => building && onBuildingClick(building)}
            >
              {building ? (
                <div className="text-center p-1">
                  <p className="text-xs font-semibold truncate">
                    {getBuildingName(building.type)}
                  </p>
                  <p className="text-xs">Lvl {building.level}</p>
                  
                  {building.isConstructing && building.constructionEndTime && (
                    <div className="mt-1 text-[10px] text-game-secondary">
                      {formatTime(timeLeft[building.id] || 0)}
                    </div>
                  )}
                  
                  {building.isDamaged && (
                    <div className="mt-1 text-[10px] text-game-damage">
                      Damaged
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BuildingGrid;
