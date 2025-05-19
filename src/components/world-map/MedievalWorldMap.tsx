
import React from 'react';
import { Island } from "@/types/game";
import MapBackground from './MapBackground';
import MapControls from './MapControls';
import IslandContainer from './IslandContainer';
import { useMedievalMap } from './useMedievalMap';

interface MedievalWorldMapProps {
  islands: Island[];
  onIslandClick: (island: Island) => void;
}

const MedievalWorldMap: React.FC<MedievalWorldMapProps> = ({ islands, onIslandClick }) => {
  const {
    mapPosition,
    mapScale,
    waveOffset,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleZoomIn,
    handleZoomOut
  } = useMedievalMap();

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-[#1a4c7c]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Animated water and background effects */}
      <MapBackground waveOffset={waveOffset} />
      
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
        <IslandContainer 
          islands={islands} 
          onIslandClick={onIslandClick} 
        />
      </div>
      
      {/* Navigation controls and instructions */}
      <MapControls 
        handleZoomIn={handleZoomIn} 
        handleZoomOut={handleZoomOut}
      />
    </div>
  );
};

export default MedievalWorldMap;
