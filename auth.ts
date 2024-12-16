import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!existingUser) return token;

      token.id = existingUser.id;
      token.name = existingUser.name;
      token.username = existingUser.username;
      token.email = existingUser.email;
      token.avatarUrl = existingUser.avatarUrl;
      token.isTwoFactorEnable = existingUser.isTwoFactorEnable;

      return token;
    },

    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.avatarUrl = token.avatarUrl;
        session.user.isTwoFactorEnable = token.isTwoFactorEnable;
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (!existingUser || !existingUser.emailVerified) return false;

        if (existingUser.isTwoFactorEnable) {
          if (existingUser.isTwoFactorConfirm) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                isTwoFactorConfirm: false,
              },
            });

            return true;
          } else {
            return false;
          }
        }

        return true;
      }

      return true;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
