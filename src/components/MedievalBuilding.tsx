
import React from 'react';
import { Building } from "../types/game";

interface MedievalBuildingProps {
  building: Building;
  onClick: (building: Building) => void;
}

const MedievalBuilding: React.FC<MedievalBuildingProps> = ({ building, onClick }) => {
  // Determine building class based on status
  const getBuildingClass = () => {
    if (building.isCapitol) return "building-capitol";
    if (building.isDamaged) return "building-damaged";
    if (building.isConstructing) return "building-constructing";
    return "";
  };

  // Determine building icon based on type
  const getBuildingIcon = () => {
    switch (building.type) {
      case 'capitol':
        return "🏰";
      case 'gold_mine':
        return "⛏️";
      case 'favor_shrine':
        return "🏛️";
      case 'defense_tower':
        return "🗼";
      case 'laboratory':
        return "🧪";
      default:
        return "🏠";
    }
  };

  return (
    <div 
      className={`building building-medieval ${getBuildingClass()} cursor-pointer`}
      style={{
        width: '80px',
        height: '80px',
        position: 'absolute',
        left: `${building.position.x * 100}px`,
        top: `${building.position.y * 100}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => onClick(building)}
    >
      <div className="text-2xl mb-1">{getBuildingIcon()}</div>
      <div className="text-xs font-semibold text-center">
        {building.type.replace('_', ' ')}
      </div>
      <div className="text-xs">Lvl {building.level}</div>
      
      {building.isConstructing && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-game-secondary">
          <div 
            className="h-full bg-game-primary" 
            style={{ 
              width: '50%' // This would be calculated based on construction progress
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MedievalBuilding;
