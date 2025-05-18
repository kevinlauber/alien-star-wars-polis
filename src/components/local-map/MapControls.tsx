
import React from 'react';

interface MapControlsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
      <button 
        className="w-10 h-10 rounded-full bg-[#d0b978] border-2 border-[#c8b372] text-[#4a3e1b] flex items-center justify-center hover:bg-[#e6d9a3] transition-colors"
        onClick={handleZoomIn}
      >
        +
      </button>
      <button 
        className="w-10 h-10 rounded-full bg-[#d0b978] border-2 border-[#c8b372] text-[#4a3e1b] flex items-center justify-center hover:bg-[#e6d9a3] transition-colors"
        onClick={handleZoomOut}
      >
        -
      </button>
    </div>
  );
};

export default MapControls;
