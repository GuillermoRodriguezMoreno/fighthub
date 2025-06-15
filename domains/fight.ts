export type FightResponse = {
  id?: number;
  fightOrder: number;
  titleFight?: boolean;
  closed?: boolean;
  ko?: boolean;
  draw?: boolean;
  weight: number;
  rounds: number;
  minutesPerRound: number;
  likes?: number;
  winnerId?: number;
  winnerName?: string;
  blueCornerFighterId?: number;
  blueCornerFighterName?: string;
  blueCornerFighterClub?: string;
  redCornerFighterId?: number;
  redCornerFighterName?: string;
  redCornerFighterClub?: string;
  eventId: number;
  eventName: string;
  category?: string;
  categoryId?: number;
  style?: string;
  styleId?: number;
};

export type CreateFightInputs = {
  fightOrder: number;
  titleFight: string;
  closed?: string;
  weight: number;
  rounds: number;
  minutesPerRound: number;
  blueCornerFighterId?: string;
  redCornerFighterId?: string;
  eventId: string;
  categoryId: string;
  styleId: string;
};

export type EditFightInputs = CreateFightInputs & {
  ko?: string;
  draw?: string;
  winner?: string;
};

export type FightRequest = {
  id?: number;
  fightOrder: number;
  titleFight: string;
  closed?: string;
  ko?: string;
  draw?: string;
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
