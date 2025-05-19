import { RoleResponse } from "./roles";

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  accountLocked?: boolean;
  accountEnabled?: boolean;
  createdAt: string;
  updatedAt: string | null;
  roles: string[];
};


export type EditUserInputs = {
  username: string;
  email: string;
  newPassword: string;
  repeatPassword: string;
  role: string[];
  accountEnabled: boolean;
  accountLocked: boolean;
}

export type EditUserRequest = {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: RoleResponse[];
  accountEnabled: boolean;
  accountLocked: boolean;
}