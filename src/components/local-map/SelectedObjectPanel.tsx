
import React from 'react';
import { Button } from '@/components/ui/button';
import { LocalObject } from './LocalMapObject';

interface SelectedObjectPanelProps {
  selectedObject: LocalObject | null;
  onClose: () => void;
}

const SelectedObjectPanel: React.FC<SelectedObjectPanelProps> = ({ selectedObject, onClose }) => {
  if (!selectedObject) return null;

  const getTypeIcon = (type: LocalObject['type']) => {
    switch (type) {
      case 'forest': return '🌳';
      case 'mine': return '⛏️';
      case 'farm': return '🌾';
      case 'monster': return '👹';
      case 'village': return '🏘️';
      case 'ruins': return '🏛️';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 w-64 medieval-panel z-30">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold text-[#4a3e1b] capitalize flex items-center">
          <div className="w-6 h-6 flex items-center justify-center mr-2">
            {getTypeIcon(selectedObject.type)}
          </div>
          {selectedObject.type}
        </div>
        
        {/* Status indicator */}
        <div className="text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: selectedObject.conquered ? 'rgba(52, 152, 219, 0.2)' : 'rgba(200, 179, 114, 0.2)',
            border: `1px solid ${selectedObject.conquered ? '#3498db' : '#c8b372'}`
          }}
        >
          {selectedObject.conquered ? 'Conquered' : selectedObject.discovered ? 'Discovered' : 'Unexplored'}
        </div>
      </div>
      
      <div className="text-[#4a3e1b] text-sm mb-4 border-l-2 border-[#c8b372] pl-2">
        {!selectedObject.discovered ? (
          "This area hasn't been explored yet. Send scouts to discover what lies here."
        ) : selectedObject.conquered ? (
          "You have conquered this area and are collecting resources from it. Your influence is expanding."
        ) : (
          `A ${selectedObject.type} awaits conquest. You can send troops to conquer it and gain its resources.`
        )}
      </div>
      
      {/* Resource info for conquered areas */}
      {selectedObject.conquered && (
        <div className="mb-4 p-2 bg-[#f3e9c6] border border-[#c8b372] rounded text-xs">
          <div className="font-semibold mb-1">Resources:</div>
          <div className="grid grid-cols-2 gap-1">
            <div>Production:</div>
            <div>10 gold/hr</div>
            <div>Defense:</div>
            <div>15 units</div>
          </div>
        </div>
      )}
      
      {selectedObject.discovered && !selectedObject.conquered && (
        <Button className="medieval-button w-full flex items-center justify-center space-x-1">
          <span>Conquer {selectedObject.type}</span>
          <span className="text-xs">(2:00:00)</span>
        </Button>
      )}
      
      {!selectedObject.discovered && (
        <Button className="medieval-button w-full flex items-center justify-center space-x-1">
          <span>Explore Area</span>
          <span className="text-xs">(0:30:00)</span>
        </Button>
      )}
      
      <Button 
        variant="outline" 
        className="w-full mt-2 border-[#c8b372] text-[#4a3e1b]"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default SelectedObjectPanel;
