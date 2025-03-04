import { ClubPageResponseSchema, ClubSchema } from "@/domains/Club";

export async function getClubs() {
  const res = await fetch("http://localhost:8080/api/v1/clubs");
    return ClubPageResponseSchema.parse(await res.json());
}

export async function getClub(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/clubs/${id}`);
    return ClubSchema.parse(await res.json());
}