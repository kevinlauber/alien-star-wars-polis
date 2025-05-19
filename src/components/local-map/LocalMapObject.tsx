
import React from 'react';

// Types for local map objects
export interface LocalObject {
  id: string;
  type: 'forest' | 'mine' | 'farm' | 'monster' | 'village' | 'ruins';
  position: { x: number; y: number };
  discovered: boolean;
  conquered: boolean;
  name: string;
  description: string;
}

interface LocalMapObjectProps {
  object: LocalObject;
  onClick: (object: LocalObject) => void;
}

const LocalMapObject: React.FC<LocalMapObjectProps> = ({ object, onClick }) => {
  // Define building styles based on type
  const getBuildingStyle = () => {
    const baseStyle = {
      backgroundImage: `url("/lovable-uploads/${getBuildingBackground(object.type)}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '4px',
      boxShadow: object.conquered ? '0 0 8px #3498db' : '0 2px 4px rgba(0,0,0,0.3)',
      transform: 'translateZ(0)',
    };
    
    return baseStyle;
  };
  
  const getBuildingBackground = (type: LocalObject['type']) => {
    switch (type) {
      case 'forest': return 'forest-2d.png';
      case 'mine': return 'mine-2d.png';
      case 'farm': return 'farm-2d.png';
      case 'monster': return 'monster-2d.png';
      case 'village': return 'village-2d.png';
      case 'ruins': return 'ruins-2d.png';
      default: return 'default-2d.png';
    }
  };

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

  const getObjectClass = (object: LocalObject) => {
    if (!object.discovered) return "undiscovered";
    if (object.conquered) return "conquered";
    return "discovered";
  };

  // Use a more medieval 2D style shadow
  const getShadowStyle = () => {
    return {
      width: '80%',
      height: '15%',
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: '50%',
      filter: 'blur(2px)',
      transform: 'translateY(20px)',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <div
      key={object.id}
      className={`absolute ${getObjectClass(object)}`}
      style={{
        width: '60px',
        height: '60px',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        opacity: object.discovered ? 1 : 0.6,
        transition: 'all 0.3s ease'
      }}
      onClick={() => onClick(object)}
    >
      {/* Object shadow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={getShadowStyle()}
      />
      
      {/* Object base with 2D medieval styling */}
      <div 
        className={`absolute inset-0 flex items-center justify-center hover:scale-105 transition-all`}
        style={getBuildingStyle()}
      >
        {/* Object icon as a fallback */}
        <div className="text-xl absolute bottom-0 right-0 bg-black bg-opacity-40 rounded-tl-md p-0.5">
          {getTypeIcon(object.type)}
        </div>
        
        {/* Conquering effect for conquered objects */}
        {object.conquered && (
          <div className="absolute inset-0 rounded-lg" 
            style={{
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.3))',
              border: '1px solid rgba(52, 152, 219, 0.5)',
              animation: 'pulse-glow 2s infinite ease-in-out'
            }}
          />
        )}
      </div>
      
      {/* Object label */}
      <div 
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-xs font-semibold text-white bg-black bg-opacity-70 rounded-sm whitespace-nowrap"
        style={{
          opacity: object.discovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {object.name || object.type}
      </div>
    </div>
  );
};

export default LocalMapObject;
