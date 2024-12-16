"use server";

import { prisma } from "@/lib/prisma";

export const emailVerification = async (token: string) => {
  const existingToken = await prisma.token.findFirst({ where: { token } });
  if (!existingToken) return { error: "Token doesn't exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await prisma.user.findFirst({
    where: { email: existingToken.email },
  });
  if (!existingUser) return { error: "Email doesn't exist!" };

  await prisma.token.delete({ where: { id: existingToken.id } });
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
    },
  });

  return { success: "Email verified successfully." };
};
