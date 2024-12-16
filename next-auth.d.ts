import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string | null;
    isTwoFactorEnable: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      avatarUrl: string | null;
      isTwoFactorEnable: boolean;
    } & DefaultSession["user"];
  }
}
