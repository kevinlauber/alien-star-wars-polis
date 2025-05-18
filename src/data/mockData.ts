
import { AlienFaction, AttackReport, Building, BuildingType, City, Island, Technology, User } from "../types/game";

export const mockUser: User = {
  id: '1',
  username: 'Commander',
  premium: false,
  diamonds: 15
};

export const mockCity: City = {
  id: '1',
  name: 'Alpha Base',
  level: 3,
  health: 85,
  resources: {
    gold: 2500,
    favor: 15,
    maxFavor: 20,
    diamonds: 15
  }
};

export const mockBuildings: Building[] = [
  {
    id: '1',
    type: BuildingType.CAPITOL,
    level: 3,
    position: { x: 2, y: 2 },
    isCapitol: true,
    isDamaged: false
  },
  {
    id: '2',
    type: BuildingType.GOLD_MINE,
    level: 2,
    position: { x: 1, y: 1 },
    isCapitol: false,
    isDamaged: false
  },
  {
    id: '3',
    type: BuildingType.FAVOR_SHRINE,
    level: 2,
    position: { x: 3, y: 1 },
    isCapitol: false,
    isDamaged: false
  },
  {
    id: '4',
    type: BuildingType.DEFENSE_TOWER,
    level: 1,
    position: { x: 1, y: 3 },
    isCapitol: false,
    isDamaged: true
  },
  {
    id: '5',
    type: BuildingType.LABORATORY,
    level: 1,
    position: { x: 3, y: 3 },
    isCapitol: false,
    isDamaged: false,
    isConstructing: true,
    constructionEndTime: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
  }
];

export const mockAlienFaction: AlienFaction = {
  id: '1',
  name: 'Zephyrians',
  description: 'A technologically advanced species that values knowledge and innovation. They are generally peaceful but will defend their territories fiercely.',
  imageUrl: '/placeholder.svg',
  relationship: 'neutral'
};

export const mockTechnologies: Technology[] = [
  {
    id: '1',
    name: 'Enhanced Mining',
    description: 'Zephyrian mining techniques increase gold production by 10%.',
    favorCost: 30,
    level: 1
  },
  {
    id: '2',
    name: 'Energy Shields',
    description: 'Protective barriers that reduce damage from attacks by 15%.',
    favorCost: 45,
    level: 2
  },
  {
    id: '3',
    name: 'Orbital Strike',
    description: 'Call down a precision strike on enemy buildings, guaranteed to destroy one building.',
    favorCost: 60,
    diamondCost: 2,
    level: 3
  }
];

export const mockIslands: Island[] = [
  { 
    id: '1', 
    position: { x: 5, y: 5 },
    isOwn: true,
    isDestroyed: false,
    health: 85
  },
  { 
    id: '2', 
    position: { x: 3, y: 7 },
    ownerName: 'Admiral567',
    isOwn: false,
    isDestroyed: false,
    health: 90
  },
  { 
    id: '3', 
    position: { x: 7, y: 3 },
    isOwn: false,
    isDestroyed: true,
    health: 0
  },
  { 
    id: '4', 
    position: { x: 8, y: 8 },
    isOwn: false,
    isDestroyed: false,
    health: 100
  },
  { 
    id: '5', 
    position: { x: 2, y: 2 },
    ownerName: 'SpaceRaider',
    isOwn: false,
    isDestroyed: false,
    health: 65
  }
];

export const mockAttackReports: AttackReport[] = [
  {
    id: '1',
    attackerName: 'SpaceRaider',
    defenderName: 'Commander',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    damageDealt: 15,
    buildingsDestroyed: 1,
    successful: true
  },
  {
    id: '2',
    attackerName: 'Commander',
    defenderName: 'Admiral567',
    date: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    damageDealt: 10,
    buildingsDestroyed: 0,
    successful: true
  }
];

export const getBuildingName = (type: string): string => {
  switch (type) {
    case BuildingType.CAPITOL:
      return 'Capitol';
    case BuildingType.GOLD_MINE:
      return 'Gold Mine';
    case BuildingType.FAVOR_SHRINE:
      return 'Favor Shrine';
    case BuildingType.DEFENSE_TOWER:
      return 'Defense Tower';
    case BuildingType.LABORATORY:
      return 'Laboratory';
    default:
      return 'Unknown';
  }
};

export const getBuildingDescription = (type: string): string => {
  switch (type) {
    case BuildingType.CAPITOL:
      return 'The heart of your city. Upgrading increases your city level and unlocks new buildings.';
    case BuildingType.GOLD_MINE:
      return 'Generates gold over time. Higher levels produce more gold.';
    case BuildingType.FAVOR_SHRINE:
      return 'Increases your maximum favor and favor regeneration rate.';
    case BuildingType.DEFENSE_TOWER:
      return 'Protects your city from attacks, reducing damage taken.';
    case BuildingType.LABORATORY:
      return 'Allows research into advanced technologies. Higher levels unlock more powerful technologies.';
    default:
      return '';
  }
};

export const calculateConstructionTime = (level: number): number => {
  // 10min, 20min, 40min, etc. in milliseconds
  return 10 * Math.pow(2, level - 1) * 60 * 1000;
};

export const formatTime = (milliseconds: number): string => {
  if (milliseconds <= 0) return 'Complete';
  
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateTimeLeft = (endTime: Date): number => {
  const now = new Date();
  return Math.max(0, endTime.getTime() - now.getTime());
};
