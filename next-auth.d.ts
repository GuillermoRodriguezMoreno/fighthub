import "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    roles?: string[];
  }

  interface Session {
    accessToken?: string;
    roles?: string[];
  }

  interface JWT {
    accessToken?: string;
  }
}