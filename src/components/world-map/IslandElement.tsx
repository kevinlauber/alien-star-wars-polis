
import React from 'react';
import { Island } from "@/types/game";

interface IslandElementProps {
  island: Island;
  onClick: (island: Island) => void;
}

const IslandElement: React.FC<IslandElementProps> = ({ island, onClick }) => {
  // Determine island class based on status
  const getIslandClass = () => {
    if (island.isDestroyed) return "island-destroyed";
    if (island.isOwn) return "island-own";
    if (island.ownerName) return "island-enemy";
    return "island-empty";
  };

  // Add subtle floating animation
  const floatAnimation = island.isOwn ? 
    "animate-float" : 
    island.isDestroyed ? "" : "hover:animate-float";

  // Calculate size based on health/importance
  const size = island.isOwn ? 60 : 40;

  return (
    <div
      key={island.id}
      className={`island ${getIslandClass()} ${floatAnimation}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        left: `${island.position.x}px`,
        top: `${island.position.y}px`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23558435' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: island.isOwn ? '0 0 15px rgba(52, 152, 219, 0.7)' : 'none',
        filter: island.isDestroyed ? 'grayscale(100%)' : 'none',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
      }}
      onClick={() => onClick(island)}
    >
      {island.ownerName && (
        <div className="absolute -bottom-6 text-xs font-semibold text-white bg-black bg-opacity-50 px-1 rounded">
          {island.ownerName}
        </div>
      )}
      
      {/* Enhanced 3D effect with pseudo-elements */}
      <div className="w-full h-full relative">
        {/* Island shadow for depth */}
        <div 
          className="absolute -bottom-4 left-1/2 w-4/5 h-1/6 bg-black opacity-40 rounded-full blur-sm transform -translate-x-1/2"
        ></div>
        
        {/* Island base layer */}
        <div 
          className="absolute inset-0 rounded-full transform translate-y-[10%]"
          style={{
            backgroundColor: island.isOwn ? '#34495e' : 
                            island.ownerName ? '#7f1d1d' :
                            island.isDestroyed ? '#1e1e1e' : '#2c3e50',
            zIndex: 1
          }}
        ></div>
        
        {/* Island middle layer for 3D effect */}
        <div 
          className="absolute inset-0 rounded-full transform translate-y-[5%] scale-95"
          style={{
            backgroundColor: island.isOwn ? '#2980b9' : 
                            island.ownerName ? '#c0392b' :
                            island.isDestroyed ? '#596672' : '#7f8c8d',
            zIndex: 2
          }}
        ></div>
        
        {/* Island top layer */}
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center transform translate-y-[0%] scale-90"
          style={{
            backgroundColor: island.isOwn ? '#3498db' : 
                            island.ownerName ? '#e74c3c' :
                            island.isDestroyed ? '#7f8c8d' : '#95a5a6',
            zIndex: 3,
            overflow: 'hidden'
          }}
        >
          {/* Inner details for texture */}
          {!island.isDestroyed && (
            <>
              <div className="w-2/3 h-2/3 rounded-full bg-current opacity-20"></div>
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white opacity-30"></div>
              {island.isOwn && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-xs font-bold z-10 bg-black bg-opacity-20 px-1 rounded">
                    {island.health}%
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Island highlight for better 3D effect */}
        <div 
          className="absolute top-[10%] left-[10%] w-[30%] h-[20%] rounded-full bg-white opacity-30 z-4"
        ></div>
      </div>
    </div>
  );
};

export default IslandElement;
