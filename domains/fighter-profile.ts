import { CategoryResponse } from "./category";
import { ClubResponse } from "./club";
import { StyleResponse } from "./style";

export type FighterProfileResponse = {
    id: number;
    weight: number;
    height: number;
    gender: string;
    biography: string;
    userId?: number;
    name: string;
    username: string;
    email: string;
    dateOfBirth: string;
    styles: StyleResponse[];
    category: CategoryResponse;
    club: ClubResponse;
};