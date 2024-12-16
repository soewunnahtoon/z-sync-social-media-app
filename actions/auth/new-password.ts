"use server";

import bcryptjs from "bcryptjs";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { newPasswordSchema } from "@/schemas";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword)
    return { error: "Password and confirm password do not match!" };

  const existingToken = await prisma.token.findFirst({ where: { token } });
  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token expired!" };

  const existingUser = await prisma.user.findFirst({
    where: { email: existingToken.email },
  });
  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.token.delete({ where: { id: existingToken.id } });

  return { success: "New password updated successfully." };
};
