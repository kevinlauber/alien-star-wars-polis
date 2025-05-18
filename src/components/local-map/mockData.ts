
import { LocalObject } from './LocalMapObject';

// Mock data for local map objects
export const mockMapObjects: LocalObject[] = [
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

export const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};
