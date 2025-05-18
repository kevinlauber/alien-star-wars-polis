
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResourceBar from '@/components/ResourceBar';
import { Map } from 'lucide-react';

// Import components
import LocalMapObject, { LocalObject } from '@/components/local-map/LocalMapObject';
import LocalMapCityMarker from '@/components/local-map/LocalMapCityMarker';
import MapControls from '@/components/local-map/MapControls';
import MapDecoration from '@/components/local-map/MapDecoration';
import FogOfWar from '@/components/local-map/FogOfWar';
import SelectedObjectPanel from '@/components/local-map/SelectedObjectPanel';

// Import hooks
import { useMapDrag } from '@/hooks/useMapDrag';
import { useMapZoom } from '@/hooks/useMapZoom';

// Import mock data
import { mockMapObjects, mockResources } from '@/components/local-map/mockData';

const LocalMapPage = () => {
  const navigate = useNavigate();
  const [selectedObject, setSelectedObject] = useState<LocalObject | null>(null);
  const [animationTime, setAnimationTime] = useState(0);
  
  // Use custom hooks for map interactions
  const { mapScale, fogOpacity, handleZoomIn, handleZoomOut } = useMapZoom();
  const { 
    mapPosition, 
    isDragging, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp 
  } = useMapDrag();
  
  // Animation for terrain elements
  useState(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  });

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
        {/* Map decorations - grid, compass, borders */}
        <MapDecoration />
        
        {/* City in the center */}
        <LocalMapCityMarker mapScale={mapScale} mapPosition={mapPosition} />
        
        {/* Map objects container */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {mockMapObjects.map((object) => (
            <LocalMapObject 
              key={object.id} 
              object={object} 
              onClick={setSelectedObject}
            />
          ))}
        </div>

        {/* Fog of war effect */}
        <FogOfWar 
          fogOpacity={fogOpacity}
          mapScale={mapScale}
          mapPosition={mapPosition}
        />
        
        {/* Navigation controls */}
        <MapControls 
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
        
        {/* Selected object info panel */}
        <SelectedObjectPanel
          selectedObject={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      </div>
    </div>
  );
};

export default LocalMapPage;
