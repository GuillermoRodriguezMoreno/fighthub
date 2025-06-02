import { RoleType } from "@/domains/roles";

export const fromRoleTypeToRole = (roleType: RoleType) => {
  switch (roleType) {
    case RoleType.ADMIN:
      return {
        id: 2,
        name: RoleType.ADMIN,
      };
    default:
      return {
        id: 1,
        name: RoleType.USER,
      };
  }
};
