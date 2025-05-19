
import React from 'react';

interface MapControlsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <>
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
    </>
  );
};

export default MapControls;
