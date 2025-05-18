
import React, { useState, useEffect } from 'react';
import { Island } from "../types/game";

interface MedievalWorldMapProps {
  islands: Island[];
  onIslandClick: (island: Island) => void;
}

const MedievalWorldMap: React.FC<MedievalWorldMapProps> = ({ islands, onIslandClick }) => {
  // Add animation effects
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Wave animation for water
  const [waveOffset, setWaveOffset] = useState(0);
  
  useEffect(() => {
    // Simple wave animation by moving the water pattern
    const waveInterval = setInterval(() => {
      setWaveOffset(prevOffset => (prevOffset + 1) % 100);
    }, 150);
    
    return () => clearInterval(waveInterval);
  }, []);

  // Zoom handlers
  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev - 0.2, 0.6));
  };

  // Map panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPosition.x;
    const deltaY = e.clientY - lastPosition.y;
    
    setMapPosition(prev => ({ 
      x: prev.x + deltaX, 
      y: prev.y + deltaY 
    }));
    
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-[#1a4c7c]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Animated water background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2333699c' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          transform: `translateX(${waveOffset}px)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      ></div>
      
      {/* Add animated waves */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-6 bg-[#2a6ca3] opacity-20"
            style={{
              top: `${20 + i * 25}%`,
              left: 0,
              transform: `translateX(${waveOffset * (i % 2 ? -1 : 1)}px)`,
              borderRadius: '50%',
              boxShadow: '0 0 10px 5px #2a6ca3',
              transition: 'transform 0.5s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Clouds moving slowly */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-5"
            style={{
              width: `${100 + i * 50}px`,
              height: `${50 + i * 20}px`,
              top: `${10 + i * 30}%`,
              left: `${(waveOffset / 2) + (i * 30)}%`,
              filter: 'blur(20px)',
              transform: 'translateX(-50%)',
              transition: 'left 2s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Map container with scale and position transformations */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Map islands */}
        {islands.map((island) => {
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
              onClick={() => onIslandClick(island)}
            >
              {island.ownerName && (
                <div className="absolute -bottom-6 text-xs font-semibold text-white bg-black bg-opacity-50 px-1 rounded">
                  {island.ownerName}
                </div>
              )}
              
              {/* Add 3D effect with pseudo-elements */}
              <div className="w-full h-full relative">
                {/* Island base */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: island.isOwn ? '#34495e' : 
                                    island.ownerName ? '#7f1d1d' :
                                    island.isDestroyed ? '#1e1e1e' : '#2c3e50',
                    transform: 'translateY(20%)',
                    zIndex: 1
                  }}
                ></div>
                
                {/* Island top */}
                <div 
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: island.isOwn ? '#3498db' : 
                                    island.ownerName ? '#e74c3c' :
                                    island.isDestroyed ? '#7f8c8d' : '#95a5a6',
                    transform: 'translateY(-5%)',
                    zIndex: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Inner details */}
                  {!island.isDestroyed && (
                    <>
                      <div className="w-2/3 h-2/3 rounded-full bg-current opacity-20"></div>
                      <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white opacity-30"></div>
                    </>
                  )}
                  
                  {island.isOwn && (
                    <div className="text-white text-xs font-bold z-10">
                      {island.health}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
        <button 
          className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors"
          onClick={handleZoomIn}
        >
          +
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors"
          onClick={handleZoomOut}
        >
          -
        </button>
      </div>
      
      {/* Map instructions */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-sm p-2 rounded z-10">
        Click and drag to move • Scroll to zoom
      </div>
    </div>
  );
};

export default MedievalWorldMap;
