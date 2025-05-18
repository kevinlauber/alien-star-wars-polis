
import React from 'react';

interface FogOfWarProps {
  fogOpacity: number;
  mapScale: number;
  mapPosition: { x: number; y: number; };
}

const FogOfWar: React.FC<FogOfWarProps> = ({ fogOpacity, mapScale, mapPosition }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="w-full h-full"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backdropFilter: 'blur(2px)',
          opacity: fogOpacity
        }}
      >
        {/* Radial gradient to reveal area around city */}
        <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle 250px at center, transparent, black)',
            transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          }}
        ></div>
      </div>
      
      {/* Subtle blue circuit-like lines in the fog */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,90 L40,90 L60,70 L90,70' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10,50 L30,50 L50,30 L90,30' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3Cpath d='M90,50 L70,50 L50,70 L10,70' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
    </div>
  );
};

export default FogOfWar;
