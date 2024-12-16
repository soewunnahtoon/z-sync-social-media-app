import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
