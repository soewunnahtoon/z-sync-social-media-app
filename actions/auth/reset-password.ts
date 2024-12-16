"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/schemas";
import { generateResetPasswordToken } from "@/actions/auth/generate-token";
import { sendResetPasswordMail } from "@/lib/mail";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  const validatedFields = resetPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) return { error: "Email not found!" };

  const resetPasswordToken = await generateResetPasswordToken(email);
  await sendResetPasswordMail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset password email send." };
};
