
export interface User {
  id: string;
  username: string;
  premium: boolean;
  diamonds: number;
}

export interface Resources {
  gold: number;
  favor: number;
  maxFavor: number;
  diamonds?: number;
}

export interface Building {
  id: string;
  type: string;
  level: number;
  position: { x: number, y: number };
  isCapitol: boolean;
  isDamaged: boolean;
  isConstructing?: boolean;
  constructionEndTime?: Date;
}

export interface City {
  id: string;
  name: string;
  level: number;
  health: number;
  resources: Resources;
}

export interface AlienFaction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  relationship: string; // friendly, neutral, hostile
}

export interface Island {
  id: string;
  position: { x: number, y: number };
  ownerName?: string;
  isOwn: boolean;
  isDestroyed: boolean;
  health: number;
}

export enum BuildingType {
  CAPITOL = 'capitol',
  GOLD_MINE = 'gold_mine',
  FAVOR_SHRINE = 'favor_shrine',
  DEFENSE_TOWER = 'defense_tower',
  LABORATORY = 'laboratory',
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  favorCost: number;
  diamondCost?: number;
  level: number;
}

export interface AttackReport {
  id: string;
  attackerName: string;
  defenderName: string;
  date: Date;
  damageDealt: number;
  buildingsDestroyed: number;
  successful: boolean;
}
