"use server";

import streamServerClient from "@/lib/stream";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/schemas";
import { validateUser } from "@/actions/auth/validate-user";
import { getUserDataSelect } from "@/lib/utils/user-data-select";

interface UpdateProfileProps {
  values: z.infer<typeof updateProfileSchema>;
}

export const updateProfile = async (values: UpdateProfileProps) => {
  const user = await validateUser();
  if (!user) throw new Error("Unauthorized!");

  const validatedValues = updateProfileSchema.parse(values);

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });

    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: { name: validatedValues.name },
    });

    return updatedUser;
  });

  return updatedUser;
};
