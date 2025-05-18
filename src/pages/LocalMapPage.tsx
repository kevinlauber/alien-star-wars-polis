
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResourceBar from '@/components/ResourceBar';
import { Map } from 'lucide-react';

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

const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};

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
      
      {/* Map container with 2D styled paper background */}
      <div 
        className="flex-1 relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          background: 'linear-gradient(to bottom, #285e39, #3a7349)',
        }}
      >
        {/* Parchment texture and grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px',
          opacity: 0.5
        }}></div>
        
        {/* Decorative compass rose */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23c8b372' stroke-width='2'/%3E%3Cpath d='M50 5 L53 50 L50 95 M5 50 L50 47 L95 50' stroke='%23c8b372' stroke-width='2'/%3E%3Cpath d='M50 5 L50 95 M5 50 L95 50' stroke='%23c8b372' stroke-width='1'/%3E%3Cpath d='M15 15 L85 85 M15 85 L85 15' stroke='%23c8b372' stroke-width='1' stroke-dasharray='2,2'/%3E%3Ctext x='50' y='15' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EN%3C/text%3E%3Ctext x='85' y='50' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EE%3C/text%3E%3Ctext x='50' y='90' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3ES%3C/text%3E%3Ctext x='15' y='50' font-family='serif' font-size='10' text-anchor='middle' fill='%23c8b372'%3EW%3C/text%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}></div>
        
        {/* Decorative medieval border frame */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-8" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M0,20 L0,10 C10,15 20,0 30,10 C40,20 50,5 60,10 C70,15 80,0 90,10 L100,10 L100,20 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 8px',
            backgroundRepeat: 'repeat-x'
          }}></div>
          <div className="absolute inset-x-0 bottom-0 h-8" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M0,0 L0,10 C10,5 20,20 30,10 C40,0 50,15 60,10 C70,5 80,20 90,10 L100,10 L100,0 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 8px',
            backgroundRepeat: 'repeat-x'
          }}></div>
          <div className="absolute inset-y-0 left-0 w-8" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100'%3E%3Cpath d='M20,0 L10,0 C15,10 0,20 10,30 C20,40 5,50 10,60 C15,70 0,80 10,90 L10,100 L20,100 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '8px 100px',
            backgroundRepeat: 'repeat-y'
          }}></div>
          <div className="absolute inset-y-0 right-0 w-8" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100'%3E%3Cpath d='M0,0 L10,0 C5,10 20,20 10,30 C0,40 15,50 10,60 C5,70 20,80 10,90 L10,100 L0,100 Z' fill='%231a3057' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '8px 100px',
            backgroundRepeat: 'repeat-y'
          }}></div>
        </div>
        
        {/* City in the center with improved 2D styling */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          }}
        >
          <div className="relative w-full h-full">
            {/* City base shadow (projected shadow technique) */}
            <div className="absolute bottom-0 left-1/2 w-16 h-4 bg-black opacity-30 rounded-full transform -translate-x-1/2 translate-y-1 blur-sm"></div>
            
            {/* City base */}
            <div className="absolute inset-0 rounded-full bg-[#e6d9a3] border-4 border-[#c8b372]">
              {/* Decorative elements */}
              <div className="absolute inset-2 rounded-full border-2 border-[#c8b372] opacity-50"></div>
            </div>
            
            {/* City castle with 2D false perspective */}
            <div className="absolute top-1/2 left-1/2 w-12 h-14 transform -translate-x-1/2 -translate-y-3/4">
              <div className="absolute bottom-0 w-full h-8 bg-[#d0b978]"></div>
              <div className="absolute bottom-8 left-1/2 w-8 h-6 bg-[#e6d9a3] transform -translate-x-1/2"></div>
              <div className="absolute bottom-5 left-1/2 w-4 h-4 bg-[#1a3057] transform -translate-x-1/2 rounded-t-full"></div>
              <div className="absolute bottom-14 left-1/2 w-4 h-6 bg-[#c8b372] transform -translate-x-1/2"></div>
              <div className="absolute bottom-20 left-1/2 w-6 h-2 bg-[#d0b978] transform -translate-x-1/2"></div>
              
              {/* Castle flag with subtle animation */}
              <div className="absolute bottom-20 left-1/2 w-6 h-4 bg-[#3498db] transform -translate-x-1/2 origin-bottom-left" 
                style={{ 
                  animation: 'wave 2s ease-in-out infinite',
                  clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0% 100%)'
                }}>
              </div>
              
              {/* Futuristic blue glow */}
              <div className="absolute inset-0 rounded opacity-20 mix-blend-overlay"
                style={{
                  boxShadow: '0 0 15px 2px #3498db',
                  animation: 'pulse-glow 3s infinite ease-in-out'
                }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map objects with improved 2D styling */}
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
                width: '50px',
                height: '50px',
                left: `${object.position.x}px`,
                top: `${object.position.y}px`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                opacity: object.discovered ? 1 : 0.6,
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedObject(object)}
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
                {object.type}
              </div>
            </div>
          ))}
        </div>

        {/* Fog of war effect with improved visual style */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
              backdropFilter: 'blur(2px)',
              opacity: fogOpacity
            }}
          >
            {/* Radial gradient to reveal area around city */}
            <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'radial-gradient(circle 250px at center, transparent, black)',
                transform: `translate(-50%, -50%) scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
              }}
            ></div>
          </div>
          
          {/* Subtle blue circuit-like lines in the fog */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,90 L40,90 L60,70 L90,70' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10,50 L30,50 L50,30 L90,30' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3Cpath d='M90,50 L70,50 L50,70 L10,70' stroke='%233498db' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          ></div>
        </div>
        
        {/* Navigation controls with medieval styling */}
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
        
        {/* Selected object info panel with improved medieval styling */}
        {selectedObject && (
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
