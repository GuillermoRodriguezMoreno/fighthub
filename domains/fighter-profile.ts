import { CategoryResponse } from "./category";
import { ClubResponse } from "./club";
import { StyleResponse } from "./style";

export type FighterProfileResponse = {
  id: number;
  name: string;
  dateOfBirth: string;
  weight: number;
  height: number;
  gender: string;
  biography: string;
  wins: number;
  losses: number;
  draws: number;
  kos: number;
  winsInARow: number;
  profilePicture?: string;
  location: {
    country: string;
    city: string;
  };
  userId: number;
  username: string;
  email: string;
  styles: StyleResponse[];
  category: CategoryResponse;
  club: ClubResponse;
};

export type AddFighterToClubInputs = {
  fighterId: number;
};

export type AddFighterToClubRequest = AddFighterToClubInputs;
