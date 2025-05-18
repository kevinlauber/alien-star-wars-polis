
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
}

export const useMapZoom = ({
  initialScale = 1,
  minScale = 0.6,
  maxScale = 2,
  scaleStep = 0.2
}: UseMapZoomProps = {}): UseMapZoomReturn => {
  const [mapScale, setMapScale] = useState(initialScale);
  const [fogOpacity, setFogOpacity] = useState(0.7);

  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev + scaleStep, maxScale));
    setFogOpacity(prev => Math.max(prev - 0.1, 0.2));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev - scaleStep, minScale));
    setFogOpacity(prev => Math.min(prev + 0.1, 0.8));
  };

  return {
    mapScale,
    fogOpacity,
    handleZoomIn,
    handleZoomOut
  };
};
