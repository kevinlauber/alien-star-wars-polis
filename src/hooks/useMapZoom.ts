
import { useState } from 'react';

interface UseMapZoomProps {
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  scaleStep?: number;
}

interface UseMapZoomReturn {
  mapScale: number;
  fogOpacity: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  resetZoom: () => void;
}

export const useMapZoom = ({
  initialScale = 1,
  minScale = 0.6,
  maxScale = 2,
  scaleStep = 0.2
}: UseMapZoomProps = {}): UseMapZoomReturn => {
  const [mapScale, setMapScale] = useState(initialScale);
  const [fogOpacity, setFogOpacity] = useState(0.6);

  const handleZoomIn = () => {
    setMapScale(prev => {
      const newScale = Math.min(prev + scaleStep, maxScale);
      // Calculate fog density based on zoom level
      const fogReduction = (newScale - minScale) / (maxScale - minScale);
      setFogOpacity(Math.max(0.7 - fogReduction * 0.5, 0.2));
      return newScale;
    });
  };

  const handleZoomOut = () => {
    setMapScale(prev => {
      const newScale = Math.max(prev - scaleStep, minScale);
      // Calculate fog density based on zoom level
      const fogReduction = (newScale - minScale) / (maxScale - minScale);
      setFogOpacity(Math.max(0.7 - fogReduction * 0.5, 0.2));
      return newScale;
    });
  };

  const resetZoom = () => {
    setMapScale(initialScale);
    setFogOpacity(0.6);
  };

  return {
    mapScale,
    fogOpacity,
    handleZoomIn,
    handleZoomOut,
    resetZoom
  };
};
