
import React from 'react';
import { Island } from "@/types/game";
import IslandElement from './IslandElement';

interface IslandContainerProps {
  islands: Island[];
  onIslandClick: (island: Island) => void;
}

const IslandContainer: React.FC<IslandContainerProps> = ({ islands, onIslandClick }) => {
  // Sort islands by position.y to ensure proper layering
  const sortedIslands = [...islands].sort((a, b) => a.position.y - b.position.y);
  
  return (
    <>
      {sortedIslands.map((island) => (
        <IslandElement 
          key={island.id}
          island={island} 
          onClick={onIslandClick} 
        />
      ))}
    </>
  );
};

export default IslandContainer;
