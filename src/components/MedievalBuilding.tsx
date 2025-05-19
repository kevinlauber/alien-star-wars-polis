
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

  // Get building size based on importance
  const getBuildingSize = () => {
    if (building.isCapitol) return { width: '100px', height: '100px' };
    if (building.level > 3) return { width: '90px', height: '90px' };
    return { width: '80px', height: '80px' };
  };

  // Get building image based on type and level
  const getBuildingImage = () => {
    // Define building types with corresponding image names
    const buildingTypes = {
      capitol: 'castle',
      gold_mine: 'mine',
      favor_shrine: 'temple',
      defense_tower: 'tower',
      laboratory: 'laboratory',
      barracks: 'barracks',
      market: 'market',
      farm: 'farm'
    };

    // Use the building type or default to 'house'
    const imageType = buildingTypes[building.type as keyof typeof buildingTypes] || 'house';
    
    // Get level between 1-3 for image variants
    const level = Math.min(building.level, 3);
    
    // Return image path using a public URL for a medieval building asset
    return `/building-${imageType}-${level}.png`;
  };

  // Determine building icon based on type
  const getBuildingIcon = () => {
    switch (building.type) {
      case 'capitol': return "🏰";
      case 'gold_mine': return "⛏️";
      case 'favor_shrine': return "🏛️";
      case 'defense_tower': return "🗼";
      case 'laboratory': return "🧪";
      case 'barracks': return "⚔️";
      case 'market': return "🏪";
      case 'farm': return "🌾";
      default: return "🏠";
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) rotateX(5deg)',
      }}
      onClick={() => onClick(building)}
    >
      {/* Building base for 3D effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-[#8B7355] rounded-md transform-style preserve-3d shadow-xl" 
        style={{transform: 'translateZ(-5px)'}}></div>
        
      {/* Main building body with enhanced shadow */}
      <div className="relative w-full h-full flex flex-col items-center justify-end">
        {/* Building shadow for 3D effect */}
        <div 
          className="absolute -bottom-4 left-1/2 w-[90%] h-[8%] bg-black opacity-40 rounded-[50%] blur-md transform -translate-x-1/2"
        ></div>
        
        {/* Building content */}
        <div className="relative w-full h-full flex flex-col items-center pt-2">
          {/* Building icon */}
          <div className="text-2xl mb-1 z-10">{getBuildingIcon()}</div>
          
          {/* Building texture with medieval pattern */}
          <div className="absolute inset-0 rounded-md" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0V36h12v4zm16 12h-4v12h8v-8h-4v-4z' fill='%23c8b372' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundColor: building.isCapitol ? '#d4af37' : '#e6d9a3',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
              border: '2px solid #c8b372',
            }}
          />
          
          {/* Building name */}
          <div className="absolute bottom-1 left-0 right-0 text-xs font-semibold text-center px-1 py-0.5 bg-[#c8b372] bg-opacity-70 rounded text-[#4a3e1b] truncate max-w-full mx-1 z-10">
            {getDisplayName()}
          </div>
          
          {/* Building level with enhanced styling */}
          <div className="absolute top-1 right-1 text-xs mt-1 font-bold z-10">
            <span className="bg-[#1a3057] text-white px-1 rounded shadow-lg border border-[#0a1f35]">
              {building.level}
            </span>
          </div>
          
          {/* Construction progress */}
          {building.isConstructing && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 z-20">
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
          
          {/* Damaged indicator with improved visuals */}
          {building.isDamaged && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-full h-full bg-red-900 bg-opacity-30 absolute backdrop-blur-sm"></div>
              <div className="bg-black bg-opacity-70 text-red-500 px-2 py-1 rounded-md rotate-12 text-xs font-bold z-30 border border-red-800 shadow-lg">
                ¡DAÑADO!
              </div>
            </div>
          )}
          
          {/* Capitol crown with enhanced visuals */}
          {building.isCapitol && (
            <div className="absolute -top-6 w-10 h-10 z-20">
              <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse" 
                  style={{filter: 'drop-shadow(0 0 3px gold) drop-shadow(0 0 2px white)'}}>
                👑
              </div>
            </div>
          )}
          
          {/* Window and door details for additional depth */}
          <div className="absolute inset-2 pointer-events-none">
            {/* Windows */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1a3057] rounded-sm opacity-70"></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#1a3057] rounded-sm opacity-70"></div>
            
            {/* Door */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-[#4a3e1b] rounded-t-sm opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedievalBuilding;
