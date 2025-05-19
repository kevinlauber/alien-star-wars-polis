
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

  return (
    <div
      key={object.id}
      className={`absolute ${getObjectClass(object)}`}
      style={{
        width: '50px',
        height: '50px',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        opacity: object.discovered ? 1 : 0.6,
        transition: 'all 0.3s ease'
      }}
      onClick={() => onClick(object)}
    >
      {/* Object shadow (projected shadow) */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-4/5 h-1/5 bg-black opacity-30 rounded-full blur-sm"
        style={{ animationDelay: `${parseInt(object.id) * 0.2}s` }}
      ></div>
      
      {/* Object base with 2D styling */}
      <div 
        className={`absolute inset-0 flex items-center justify-center rounded-lg transform hover:scale-105 transition-all`}
        style={{
          backgroundColor: object.conquered ? '#1a446b' : '#6b4a1a',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: object.conquered ? '#3498db' : '#c8b372',
          borderTopWidth: '1px',
          borderBottomWidth: '3px', // False 3D effect
          boxShadow: object.discovered ? 
            `0 3px 0 ${object.conquered ? '#163b5d' : '#5a3d14'}, inset 0 1px 0 rgba(255,255,255,0.2)` : 
            'none',
        }}
      >
        {/* Object icon with subtle floating effect */}
        <div 
          className="text-xl"
          style={{ 
            animation: object.discovered ? 'float 3s infinite ease-in-out' : 'none',
            animationDelay: `${parseInt(object.id) * 0.5}s`,
            filter: object.conquered ? 'drop-shadow(0 0 3px rgba(52, 152, 219, 0.7))' : 'none'
          }}
        >
          {getTypeIcon(object.type)}
        </div>
        
        {/* Highlight effect for interaction */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-30 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)'
          }}
        ></div>
        
        {/* Futuristic glow for conquered objects */}
        {object.conquered && (
          <div className="absolute inset-0 rounded-lg opacity-20" style={{
            boxShadow: '0 0 8px 2px #3498db',
            animation: 'pulse-glow 2s infinite ease-in-out'
          }}></div>
        )}
      </div>
      
      {/* Object label */}
      <div 
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-xs font-semibold text-white bg-black bg-opacity-50 rounded-sm whitespace-nowrap"
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
