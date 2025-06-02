import { RoleRequest, RoleType } from "./roles";

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  accountLocked?: boolean;
  accountEnabled?: boolean;
  createdAt: string;
  updatedAt: string | null;
  roles: RoleType[];
};

export type NewUserInputs = EditUserInputs;

export type NewUserRequest = Omit<EditUserRequest, "id">;

export type EditUserInputs = {
  username: string;
  email: string;
  newPassword: string;
  repeatPassword: string;
  roles: RoleType[];
  isAccountEnabled: string;
  isAccountLocked: string;
};

export type EditUserRequest = {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: RoleRequest[];
  isAccountEnabled: string;
  isAccountLocked: string;
};
