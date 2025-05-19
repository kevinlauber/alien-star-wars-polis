
import React, { useState, useEffect } from 'react';

interface MapBackgroundProps {
  waveOffset: number;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ waveOffset }) => {
  return (
    <>
      {/* Animated water background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2333699c' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          transform: `translateX(${waveOffset}px)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      />
      
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
    </>
  );
};

export default MapBackground;
