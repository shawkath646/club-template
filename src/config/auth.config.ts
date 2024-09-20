import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserSession } from "../backend/userAuth";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      async authorize({ docId }) {
        return await getUserSession(docId as string);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        const { nbcId, position, permissions } = await getUserSession(user.id);
        token.id = user.id;
        token.nbcId = nbcId;
        token.position = position;
        token.permissions = permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.nbcId = token.nbcId as string;
        session.user.position = token.position as string;
        session.user.permissions = token.permissions as string[];
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/join",
  },
  jwt: {
    maxAge: 604800
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
