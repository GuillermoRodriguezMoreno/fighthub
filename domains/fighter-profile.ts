import { CategoryResponse } from "./category";
import { ClubResponse } from "./club";
import { StyleResponse } from "./style";

export type FighterProfileResponse = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
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
  location?: {
    latitude?: number;
    longitude?: number;
    timestamp?: string;
  };
  userId: number;
  username: string;
  email: string;
  styles: StyleResponse[];
  category: CategoryResponse;
  club: ClubResponse;
  affinity?: number | null;
  distanceFromTarget?: number | null;
};

export type EditFighterProfileInputs = {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  weight: number;
  height: number;
  gender: string;
  biography: string;
  styleIds: number[];
  categoryId: number;
};

export interface EditFighterProfileRequest {
  id?: number;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  weight: number;
  height: number;
  gender: string;
  biography?: string;
  wins?: number;
  losses?: number;
  draws?: number;
  kos?: number;
  winsInARow?: number;
  location?: {
    latitude?: number;
    longitude?: number;
    timestamp?: string;
  };
  styles: {
    id: number;
  }[];
  category: {
    id: number;
  };
  club?: {
    id: number;
  };
}
export type AddFighterToClubInputs = {
  fighterId: number;
};

export type AddFighterToClubRequest = AddFighterToClubInputs;
