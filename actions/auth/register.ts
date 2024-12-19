"use server";

import bcryptjs from "bcryptjs";
import streamServerClient from "@/lib/stream";

import { z } from "zod";
import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { firstName, lastName, username, email, password, confirmPassword } =
    validatedFields.data;
  if (password !== confirmPassword)
    return { error: "Password and confirm password do not match!" };

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) return { error: "Username already in use!" };

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) return { error: "Email already in use!" };

  const userId = uuid();
  const name = `${firstName} ${lastName}`;
  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        id: userId,
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    await streamServerClient.upsertUser({
      id: userId,
      name,
      username,
    });
  });

  return { success: "Create account successfully." };
};
