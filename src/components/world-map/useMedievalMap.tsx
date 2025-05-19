
import { useState, useEffect } from 'react';
import { useMapDrag } from '@/hooks/useMapDrag';
import { useMapZoom } from '@/hooks/useMapZoom';

export const useMedievalMap = () => {
  // Wave animation for water
  const [waveOffset, setWaveOffset] = useState(0);
  
  // Map controls
  const { 
    mapPosition, 
    lastPosition, 
    isDragging, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp 
  } = useMapDrag();
  
  const { 
    mapScale, 
    handleZoomIn, 
    handleZoomOut 
  } = useMapZoom();

  useEffect(() => {
    // Simple wave animation by moving the water pattern
    const waveInterval = setInterval(() => {
      setWaveOffset(prevOffset => (prevOffset + 1) % 100);
    }, 150);
    
    return () => clearInterval(waveInterval);
  }, []);

  return {
    mapPosition,
    mapScale,
    waveOffset,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleZoomIn,
    handleZoomOut
  };
};
