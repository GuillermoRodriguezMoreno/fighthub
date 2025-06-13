import "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    roles?: string[];
    isAccountEnabled?: boolean;
    isAccountLocked?: boolean;
    userId?: number | null;
  }

  interface Session {
    accessToken?: string;
    roles?: string[];
    isAccountEnabled?: boolean;
    isAccountLocked?: boolean;
    userId?: number | null;
  }

  interface JWT {
    accessToken?: string;
  }
}
