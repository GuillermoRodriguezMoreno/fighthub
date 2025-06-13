import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "http://localhost:8080/api/v1/auth/authenticate",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const user = await res.json();
        if (res.ok && user.token) {
          return { ...user };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.roles = user.roles || [];
        token.isAccountEnabled = user.isAccountEnabled || false;
        token.isAccountLocked = user.isAccountLocked || false;
        token.userId = user.userId || null;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.roles = (token.roles as string[]) || [];
      session.isAccountEnabled = token.isAccountEnabled as boolean;
      session.isAccountLocked = token.isAccountLocked as boolean;
      session.userId = token.userId as number | null;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
