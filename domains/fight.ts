export type FightResponse = {
  id?: number;
  fightOrder: number;
  isTitleFight: boolean;
  isClosed?: boolean;
  weight: number;
  rounds: number;
  minutesPerRound: number;
  blueCornerFighterId: number;
  blueCornerFighterName: string;
  blueCornerFighterClub?: string;
  redCornerFighterId: number;
  redCornerFighterName: string;
  redCornerFighterClub?: string;
  eventId: number;
  eventName: string;
  category: string;
  style: string;
};

export type CreateFightInputs = {
  fightOrder: number;
  isTitleFight: string;
  isClosed?: string;
  isKo?: string;
  isDraw?: string;
  weight: number;
  rounds: number;
  minutesPerRound: number;
  blueCornerFighterId?: string;
  redCornerFighterId?: string;
  winner?: string;
  eventId: string;
  categoryId: string;
  styleId: string;
};

export type FightRequest = {
  id?: number;
  fightOrder: number;
  isTitleFight: string;
  isClosed?: string;
  isKo?: string;
  isDraw?: string;
  weight: number;
  rounds: number;
  minutesPerRound: number;
  blueCornerFighter?: {
    id: string;
  };
  redCornerFighter?: {
    id: string;
  };
  winner?: {
    id: string;
  };
  event: {
    id: string;
  };
  category: {
    id: string;
  };
  style: {
    id: string;
  };
};
