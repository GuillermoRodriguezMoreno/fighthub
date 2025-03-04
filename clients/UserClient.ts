import { UserPageResponseSchema, UserSchema } from "../domains/User";

export async function getUsers() {
  const res = await fetch("http://localhost:8080/api/v1/users");
    return UserPageResponseSchema.parse(await res.json());
}

export async function getUser(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/users/${id}`);
    return UserSchema.parse(await res.json());
}