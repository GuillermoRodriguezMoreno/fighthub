import { FightPageResponseSchema, FightSchema } from "@/domains/Fight";

export async function getFights() {
  const res = await fetch("http://localhost:8080/api/v1/fights");
    return FightPageResponseSchema.parse(await res.json());
}

export async function getFight(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/fights/${id}`);
    return FightSchema.parse(await res.json());
}