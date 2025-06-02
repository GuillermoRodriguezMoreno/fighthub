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
