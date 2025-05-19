
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

  // Get the building image based on type and level
  const getBuildingImage = () => {
    const type = building.type;
    const level = Math.min(building.level, 3); // Max of 3 visuals per building type
    
    return `/building-assets/${type}-${level}.png`;
  };

  // Get building size based on importance
  const getBuildingSize = () => {
    if (building.isCapitol) return { width: '100px', height: '100px' };
    if (building.level > 3) return { width: '90px', height: '90px' };
    return { width: '80px', height: '80px' };
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

  // Get a display name for the building type
  const getDisplayName = () => {
    return building.type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div 
      className={`building building-medieval ${getBuildingClass()} cursor-pointer hover:scale-105 transition-transform duration-300`}
      style={{
        ...getBuildingSize(),
        position: 'absolute',
        left: `${building.position.x * 100}px`,
        top: `${building.position.y * 100}px`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0V36h12v4zm16 12h-4v12h8v-8h-4v-4z' fill='%23c8b372' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
      onClick={() => onClick(building)}
    >
      {/* Building shadow */}
      <div 
        className="absolute -bottom-3 left-1/2 w-4/5 h-1/6 bg-black opacity-30 rounded-full blur-sm transform -translate-x-1/2"
      ></div>
      
      {/* Building content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        {/* Building icon */}
        <div className="text-2xl mb-1">{getBuildingIcon()}</div>
        
        {/* Building name */}
        <div className="text-xs font-semibold text-center px-1 bg-[#c8b372] bg-opacity-70 rounded text-[#4a3e1b] truncate max-w-full">
          {getDisplayName()}
        </div>
        
        {/* Building level */}
        <div className="text-xs mt-1 font-bold">
          <span className="bg-[#1a3057] text-white px-1 rounded">
            Lvl {building.level}
          </span>
        </div>
        
        {/* Construction progress */}
        {building.isConstructing && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5">
            <div className="w-full h-full bg-black bg-opacity-30"></div>
            <div 
              className="absolute top-0 left-0 h-full bg-[#3498db]" 
              style={{ 
                width: '50%',
                boxShadow: '0 0 4px #3498db'
              }}
            ></div>
          </div>
        )}
        
        {/* Damaged indicator */}
        {building.isDamaged && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-red-900 bg-opacity-30 absolute"></div>
            <div className="bg-black bg-opacity-50 text-red-500 px-1 rounded rotate-12 text-xs font-bold z-10">
              ¡DAÑADO!
            </div>
          </div>
        )}
        
        {/* Capitol crown */}
        {building.isCapitol && (
          <div className="absolute -top-4 w-8 h-8">
            <div className="absolute inset-0 flex items-center justify-center text-xl" style={{filter: 'drop-shadow(0 0 2px gold)'}}>
              👑
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedievalBuilding;
