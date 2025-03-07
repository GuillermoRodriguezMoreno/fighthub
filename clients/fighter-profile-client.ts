import { FighterProfilePageResponseSchema, FighterProfileSchema } from "@/domains/fighter-profile";

export async function getFighterProfiles() {
  const res = await fetch("http://localhost:8080/api/v1/fighter-profiles");
    return FighterProfilePageResponseSchema.parse(await res.json());
}

export async function getFighterProfile(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/fighter-profiles/${id}`);
    return FighterProfileSchema.parse(await res.json());
}