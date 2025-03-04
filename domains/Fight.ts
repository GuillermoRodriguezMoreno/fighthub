import { z } from "zod";
import { PageResponseSchema } from "./PageResponse";

export const FightSchema = z.object({
    id: z.number().optional(),
    fightOrder: z.number(),
    isTitleFight: z.boolean(),
    isClosed: z.boolean(),
    weight: z.number(),
    rounds: z.number(),
    minutesPerRound: z.number(),
    blueCornerFighterId: z.number().optional(),
    blueCornerFighterName: z.string(),
    blueCornerFighterClub: z.string(),
    redCornerFighterId: z.number().optional(),
    redCornerFighterName: z.string(),
    redCornerFighterClub: z.string(),
    eventId: z.number().optional(),
    eventName: z.string(),
    category: z.string(),
    style: z.string(),
});

export type Fight = z.infer<typeof FightSchema>;
export const FightPageResponseSchema = PageResponseSchema(FightSchema);
export type FightPageResponse = z.infer<typeof FightPageResponseSchema>;