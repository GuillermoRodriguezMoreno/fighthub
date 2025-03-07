import { StylePageResponseSchema, StyleSchema } from "@/domains/style";

export async function getStyles() {
  const res = await fetch("http://localhost:8080/api/v1/styles");
    return StylePageResponseSchema.parse(await res.json());
}

export async function getStyle(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/styles/${id}`);
    return StyleSchema.parse(await res.json());
}