"use server";

import crypto from "crypto";

import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";

export const generateToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.token.findFirst({ where: { email } });
  if (existingToken)
    await prisma.token.delete({ where: { id: existingToken.id } });

  const verificationToken = await prisma.token.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateTwoFactor = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await prisma.token.findFirst({ where: { email } });
  if (existingToken)
    await prisma.token.delete({ where: { id: existingToken.id } });

  const twoFactorToken = await prisma.token.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.token.findFirst({ where: { email } });
  if (existingToken)
    await prisma.token.delete({ where: { id: existingToken.id } });

  const resetPasswordToken = await prisma.token.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetPasswordToken;
};
