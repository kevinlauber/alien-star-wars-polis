
import React from 'react';
import { Shield, Sword } from 'lucide-react';

interface MapControlsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-30">
      {/* Medieval-style zoom controls */}
      <button 
        className="w-12 h-12 rounded-md bg-gradient-to-b from-[#f8e9af] to-[#d0b978] border-2 border-[#a18c4c] text-[#4a3e1b] flex items-center justify-center hover:from-[#f8ebc1] hover:to-[#d8c48c] shadow-md"
        onClick={handleZoomIn}
        aria-label="Zoom In"
      >
        <div className="text-xl font-bold">+</div>
      </button>
      <button 
        className="w-12 h-12 rounded-md bg-gradient-to-b from-[#f8e9af] to-[#d0b978] border-2 border-[#a18c4c] text-[#4a3e1b] flex items-center justify-center hover:from-[#f8ebc1] hover:to-[#d8c48c] shadow-md"
        onClick={handleZoomOut}
        aria-label="Zoom Out"
      >
        <div className="text-xl font-bold">-</div>
      </button>
      
      {/* Additional medieval controls */}
      <div className="pt-4 space-y-2">
        <button className="w-12 h-12 rounded-md bg-gradient-to-b from-[#1a446b] to-[#0d294d] border-2 border-[#3498db] text-white flex items-center justify-center hover:from-[#1d5183] hover:to-[#0f325c] shadow-md">
          <Shield className="w-6 h-6 text-[#3498db]" />
        </button>
        <button className="w-12 h-12 rounded-md bg-gradient-to-b from-[#1a446b] to-[#0d294d] border-2 border-[#3498db] text-white flex items-center justify-center hover:from-[#1d5183] hover:to-[#0f325c] shadow-md">
          <Sword className="w-6 h-6 text-[#3498db]" />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
