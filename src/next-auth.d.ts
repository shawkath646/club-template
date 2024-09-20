// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nbcId: string;
      name: string;
      position: string;
      permissions: string[];
      image: string;
      email: string;
    };
  }
}
