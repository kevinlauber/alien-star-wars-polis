
import { useState } from 'react';

interface UseMapDragProps {
  initialPosition?: { x: number; y: number };
}

interface UseMapDragReturn {
  mapPosition: { x: number; y: number };
  lastPosition: { x: number; y: number };
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
}

export const useMapDrag = ({ initialPosition = { x: 0, y: 0 } }: UseMapDragProps = {}): UseMapDragReturn => {
  const [mapPosition, setMapPosition] = useState(initialPosition);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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

  return {
    mapPosition,
    lastPosition,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
