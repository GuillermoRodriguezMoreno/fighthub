export enum RoleType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type RoleResponse = {
  id: number;
  name: RoleType;
  createdAt: Date;
  updatedAt?: Date;
};

export type RoleRequest = {
  id: number;
  name: RoleType;
};
