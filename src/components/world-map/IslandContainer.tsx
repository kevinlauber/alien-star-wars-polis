
import React from 'react';
import { Island } from "@/types/game";
import IslandElement from './IslandElement';

interface IslandContainerProps {
  islands: Island[];
  onIslandClick: (island: Island) => void;
}

const IslandContainer: React.FC<IslandContainerProps> = ({ islands, onIslandClick }) => {
  return (
    <>
      {islands.map((island) => (
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
