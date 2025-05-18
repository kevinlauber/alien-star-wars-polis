
import React from 'react';

const LocalMapCityMarker: React.FC<{ mapScale: number; mapPosition: { x: number; y: number; } }> = ({ 
  mapScale, 
  mapPosition 
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
      }}
    >
      <div className="relative w-full h-full">
        {/* City base shadow (projected shadow technique) */}
        <div className="absolute bottom-0 left-1/2 w-16 h-4 bg-black opacity-30 rounded-full transform -translate-x-1/2 translate-y-1 blur-sm"></div>
        
        {/* City base */}
        <div className="absolute inset-0 rounded-full bg-[#e6d9a3] border-4 border-[#c8b372]">
          {/* Decorative elements */}
          <div className="absolute inset-2 rounded-full border-2 border-[#c8b372] opacity-50"></div>
        </div>
        
        {/* City castle with 2D false perspective */}
        <div className="absolute top-1/2 left-1/2 w-12 h-14 transform -translate-x-1/2 -translate-y-3/4">
          <div className="absolute bottom-0 w-full h-8 bg-[#d0b978]"></div>
          <div className="absolute bottom-8 left-1/2 w-8 h-6 bg-[#e6d9a3] transform -translate-x-1/2"></div>
          <div className="absolute bottom-5 left-1/2 w-4 h-4 bg-[#1a3057] transform -translate-x-1/2 rounded-t-full"></div>
          <div className="absolute bottom-14 left-1/2 w-4 h-6 bg-[#c8b372] transform -translate-x-1/2"></div>
          <div className="absolute bottom-20 left-1/2 w-6 h-2 bg-[#d0b978] transform -translate-x-1/2"></div>
          
          {/* Castle flag with subtle animation */}
          <div className="absolute bottom-20 left-1/2 w-6 h-4 bg-[#3498db] transform -translate-x-1/2 origin-bottom-left" 
            style={{ 
              animation: 'wave 2s ease-in-out infinite',
              clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0% 100%)'
            }}>
          </div>
          
          {/* Futuristic blue glow */}
          <div className="absolute inset-0 rounded opacity-20 mix-blend-overlay"
            style={{
              boxShadow: '0 0 15px 2px #3498db',
              animation: 'pulse-glow 3s infinite ease-in-out'
            }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalMapCityMarker;
