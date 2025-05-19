
import { LocalObject } from './LocalMapObject';

// Mock data for local map objects
export const mockMapObjects: LocalObject[] = [
  {
    id: '1',
    type: 'forest',
    position: { x: 250, y: 150 },
    discovered: true,
    conquered: true,
    name: 'Ancient Woods',
    description: 'A dense forest with valuable timber'
  },
  {
    id: '2',
    type: 'mine',
    position: { x: 400, y: 200 },
    discovered: true,
    conquered: false,
    name: 'Iron Mine',
    description: 'A deep mine rich with iron ore'
  },
  {
    id: '3',
    type: 'farm',
    position: { x: 300, y: 350 },
    discovered: true,
    conquered: false,
    name: 'Fertile Fields',
    description: 'Rich soil perfect for growing crops'
  },
  {
    id: '4',
    type: 'monster',
    position: { x: 180, y: 280 },
    discovered: true,
    conquered: false,
    name: 'Dragon\'s Lair',
    description: 'Home to a fearsome dragon'
  },
  {
    id: '5',
    type: 'village',
    position: { x: 450, y: 150 },
    discovered: false,
    conquered: false,
    name: 'Hidden Village',
    description: 'A small settlement with potential allies'
  },
  {
    id: '6',
    type: 'ruins',
    position: { x: 350, y: 420 },
    discovered: false,
    conquered: false,
    name: 'Ancient Ruins',
    description: 'Remnants of an ancient civilization'
  },
  {
    id: '7',
    type: 'farm',
    position: { x: 480, y: 300 },
    discovered: true,
    conquered: false,
    name: 'Wheat Fields',
    description: 'Vast fields of golden wheat'
  },
  {
    id: '8',
    type: 'village',
    position: { x: 150, y: 400 },
    discovered: true,
    conquered: true,
    name: 'Loyal Hamlet',
    description: 'A small village that pledged allegiance'
  },
  {
    id: '9',
    type: 'monster',
    position: { x: 550, y: 250 },
    discovered: false,
    conquered: false,
    name: 'Unknown Threat',
    description: 'Strange noises have been reported'
  },
  {
    id: '10',
    type: 'ruins',
    position: { x: 200, y: 200 },
    discovered: true,
    conquered: false,
    name: 'Fallen Temple',
    description: 'Ruins of an ancient temple with mysteries'
  }
];

export const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10,
  wood: 3500,
  stone: 2800,
  iron: 1200,
  food: 4300
};
