
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
  // Define object styles based on type
  const getObjectStyle = () => {
    const baseStyle = {
      backgroundImage: `url("/assets/${getObjectBackground(object.type)}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '4px',
      boxShadow: object.conquered 
        ? '0 0 10px #3498db, 0 4px 8px rgba(0,0,0,0.4)' 
        : '0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.2)',
      transform: object.discovered 
        ? 'translateZ(0) rotateX(5deg)' 
        : 'translateZ(0) rotateX(5deg) scale(0.9)',
    };
    
    return baseStyle;
  };
  
  const getObjectBackground = (type: LocalObject['type']) => {
    switch (type) {
      case 'forest': return 'forest-medieval.png';
      case 'mine': return 'mine-medieval.png';
      case 'farm': return 'farm-medieval.png';
      case 'monster': return 'monster-medieval.png';
      case 'village': return 'village-medieval.png';
      case 'ruins': return 'ruins-medieval.png';
      default: return 'default-medieval.png';
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

  // Get more visually appealing medieval shadow
  const getShadowStyle = () => {
    return {
      width: '80%',
      height: '15%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: '50%',
      filter: 'blur(4px)',
      transform: 'translateY(20px)',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <div
      key={object.id}
      className={`absolute ${getObjectClass(object)} hover:scale-110 transition-transform duration-300`}
      style={{
        width: '80px',
        height: '80px',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        opacity: object.discovered ? 1 : 0.6,
        transition: 'all 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      onClick={() => onClick(object)}
    >
      {/* Enhanced 3D object shadow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={getShadowStyle()}
      />
      
      {/* Object base with improved 3D medieval styling */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(800px) rotateX(5deg)',
          borderRadius: '8px',
          overflow: 'hidden',
          border: object.conquered 
            ? '2px solid #3498db' 
            : '2px solid #8B7355',
          boxShadow: object.conquered 
            ? '0 0 10px rgba(52, 152, 219, 0.5), 0 5px 15px rgba(0,0,0,0.3)'
            : '0 5px 15px rgba(0,0,0,0.3)',
        }}
      >
        {/* Textured background for the object */}
        <div className="absolute inset-0 bg-[#e6d9a3]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0V36h12v4zm16 12h-4v12h8v-8h-4v-4z' fill='%23c8b372' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.8
        }}></div>
        
        {/* Object type icon with enhanced styling */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl transform translate-y-[-5px]" style={{
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))'
          }}>
            {getTypeIcon(object.type)}
          </div>
        </div>
        
        {/* Small details to improve visual depth */}
        <div className="absolute inset-0">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[10%] bg-white opacity-20 rounded-t-lg"></div>
          
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-black opacity-20 rounded-b-lg"></div>
        </div>
        
        {/* Object status indicator */}
        <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white" style={{
          backgroundColor: object.conquered ? '#3498db' : object.discovered ? '#27ae60' : '#7f8c8d',
          boxShadow: object.conquered ? '0 0 5px #3498db' : '0 0 3px rgba(255,255,255,0.5)'
        }}></div>
        
        {/* Conquering effect for conquered objects */}
        {object.conquered && (
          <div className="absolute inset-0 rounded-lg" 
            style={{
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.3))',
              border: '1px solid rgba(52, 152, 219, 0.5)',
              animation: 'pulse-glow 2s infinite ease-in-out',
              zIndex: 5
            }}
          />
        )}
      </div>
      
      {/* Object label with enhanced styling */}
      <div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-xs font-semibold text-white bg-black bg-opacity-80 rounded-md whitespace-nowrap border border-[#3498db]"
        style={{
          opacity: object.discovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}
      >
        {object.name || object.type}
      </div>
    </div>
  );
};

export default LocalMapObject;
