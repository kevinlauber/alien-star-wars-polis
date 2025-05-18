
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResourceBar from '@/components/ResourceBar';
import { map } from 'lucide-react';

const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};

// Types for our local map
interface LocalObject {
  id: string;
  type: 'forest' | 'mine' | 'farm' | 'monster' | 'village' | 'ruins';
  position: { x: number; y: number };
  discovered: boolean;
  conquered: boolean;
}

// Mock data for local map objects
const mockMapObjects: LocalObject[] = [
  {
    id: '1',
    type: 'forest',
    position: { x: 250, y: 150 },
    discovered: true,
    conquered: true
  },
  {
    id: '2',
    type: 'mine',
    position: { x: 400, y: 200 },
    discovered: true,
    conquered: false
  },
  {
    id: '3',
    type: 'farm',
    position: { x: 300, y: 350 },
    discovered: true,
    conquered: false
  },
  {
    id: '4',
    type: 'monster',
    position: { x: 180, y: 280 },
    discovered: true,
    conquered: false
  },
  {
    id: '5',
    type: 'village',
    position: { x: 450, y: 150 },
    discovered: false,
    conquered: false
  },
  {
    id: '6',
    type: 'ruins',
    position: { x: 350, y: 420 },
    discovered: false,
    conquered: false
  }
];

const LocalMapPage = () => {
  const navigate = useNavigate();
  const [selectedObject, setSelectedObject] = useState<LocalObject | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [fogOpacity, setFogOpacity] = useState(0.7);
  
  // Animation for terrain elements
  const [animationTime, setAnimationTime] = useState(0);
  
  useState(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  });
  
  // Handle map dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPosition.x;
    const deltaY = e.clientY - lastPosition.y;
    
    setMapPosition(prev => ({ 
      x: prev.x + deltaX, 
      y: prev.y + deltaY 
    }));
    
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle zooming
  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev + 0.2, 2));
    setFogOpacity(prev => Math.max(prev - 0.1, 0.2));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev - 0.2, 0.6));
    setFogOpacity(prev => Math.min(prev + 0.1, 0.8));
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
    if (!object.discovered) return 'undiscovered';
    if (object.conquered) return 'conquered';
    return 'discovered';
  };

  return (
    <div className="min-h-screen flex flex-col bg-game-background">
      <ResourceBar resources={mockResources} />
      
      <div className="medieval-header px-4 py-2 flex items-center justify-between">
        <Button 
          variant="outline" 
          className="text-white border-white"
          onClick={() => navigate('/city')}
        >
          Return to City
        </Button>
        <h1 className="text-xl font-bold">Local Map</h1>
        <Button 
          variant="outline" 
          className="text-white border-white"
          onClick={() => navigate('/map')}
        >
          World Map
        </Button>
      </div>
      
      {/* Map container */}
      <div 
        className="flex-1 relative bg-[#285e39] overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-repeat opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* City in the center */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          }}
        >
          <div className="relative w-full h-full animate-float">
            <div className="absolute inset-0 rounded-full bg-[#e6d9a3] border-2 border-[#c8b372] flex items-center justify-center z-20">
              <div className="text-2xl">🏰</div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-3/4 h-1/4 rounded-full bg-black opacity-25 z-10"></div>
          </div>
        </div>
        
        {/* Map objects */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {mockMapObjects.map((object) => (
            <div
              key={object.id}
              className={`absolute ${getObjectClass(object)}`}
              style={{
                width: '40px',
                height: '40px',
                left: `${object.position.x}px`,
                top: `${object.position.y}px`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                opacity: object.discovered ? 1 : 0.5,
                transition: 'transform 0.3s ease, opacity 0.3s ease'
              }}
              onClick={() => setSelectedObject(object)}
            >
              {/* Object visualization */}
              <div 
                className={`w-full h-full flex items-center justify-center rounded-lg relative 
                  ${object.conquered ? 'bg-blue-900 border-2 border-blue-600' : 
                    'bg-orange-900 border-2 border-orange-600'}`}
                style={{
                  transform: object.discovered ? 'translateY(0)' : 'translateY(-5px)',
                  animation: object.discovered ? 'float 3s infinite ease-in-out' : 'none',
                  animationDelay: `${parseInt(object.id) * 0.5}s`,
                  boxShadow: object.discovered ? '0 5px 15px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <div className="text-xl">{getTypeIcon(object.type)}</div>
                
                {/* Shadow under object */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3/4 h-1/4 rounded-full bg-black opacity-25" 
                  style={{
                    transform: `translate(-50%, 100%) scale(1, ${0.5 + Math.sin(animationTime / 30) * 0.1})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Fog of war effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-black opacity-70" style={{ opacity: fogOpacity }}>
            {/* Radial gradient to reveal area around city */}
            <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'radial-gradient(circle 200px at center, transparent, black)',
                transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
              }}
            ></div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
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
        
        {/* Selected object info panel */}
        {selectedObject && (
          <div className="absolute bottom-4 left-4 w-64 medieval-panel z-30">
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-semibold text-[#4a3e1b] capitalize">
                {selectedObject.type}
              </div>
              <div className="text-2xl">{getTypeIcon(selectedObject.type)}</div>
            </div>
            
            <div className="text-[#4a3e1b] text-sm mb-4">
              {!selectedObject.discovered ? (
                "This area hasn't been explored yet."
              ) : selectedObject.conquered ? (
                "You have conquered this area and are collecting resources from it."
              ) : (
                `A ${selectedObject.type} awaits conquest. You can send troops to conquer it.`
              )}
            </div>
            
            {selectedObject.discovered && !selectedObject.conquered && (
              <Button className="medieval-button w-full">
                Conquer {selectedObject.type}
              </Button>
            )}
            
            {!selectedObject.discovered && (
              <Button className="medieval-button w-full">
                Explore Area
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full mt-2 border-[#c8b372] text-[#4a3e1b]"
              onClick={() => setSelectedObject(null)}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalMapPage;
