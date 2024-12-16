"use client";

import { useSession } from "next-auth/react";

export const useClientUser = () => {
  const session = useSession();

  return session.data?.user;
};
