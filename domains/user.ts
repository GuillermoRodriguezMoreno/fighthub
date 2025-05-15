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