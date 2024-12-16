"use server";

import { auth } from "@/auth";

export const validateUser = async () => {
  const session = await auth();

  return session?.user;
};
