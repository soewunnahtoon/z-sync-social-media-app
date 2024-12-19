"use server";

import bcryptjs from "bcryptjs";

import { z } from "zod";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendMail, twoFactorMail } from "@/lib/mail";
import {
  generateToken,
  generateTwoFactor,
} from "@/actions/auth/generate-token";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, code } = validatedFields.data;

  if (code) {
    const existingToken = await prisma.token.findFirst({ where: { email } });
    if (!existingToken || existingToken.token !== code)
      return { error: "Invalid code!" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Code expired!" };

    await prisma.token.delete({ where: { id: existingToken.id } });
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isTwoFactorConfirm: true,
      },
    });
  } else {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: "Email does not exist!" };

    const passwordMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!passwordMatch) return { error: "Incorrect password!" };

    if (!existingUser.emailVerified) {
      const verificationToken = await generateToken(existingUser.email);
      await sendMail(verificationToken.email, verificationToken.token);

      return { success: "Confirmation email send." };
    }

    if (existingUser.isTwoFactorEnable) {
      const twoFactorToken = await generateTwoFactor(existingUser.email);
      await twoFactorMail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: "Two factor authentication mail sent." };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
