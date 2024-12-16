"use client";

import Link from "next/link";
import kyInstance from "@/lib/ky";
import UserTooltip from "@/components/user-tooltip";

import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { PropsWithChildren } from "react";
import { UserData } from "@/lib/utils/user-data-select";

interface UserLinkWithTooltipProps extends PropsWithChildren {
  username: string;
}

const LinkifyUsernameWithTooltip = ({
  children,
  username,
}: UserLinkWithTooltipProps) => {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <Link href={`/${username}`} className="text-primary hover:underline">
        {children}
      </Link>
    );
  }

  return (
    <UserTooltip user={data}>
      <Link href={`/${username}`} className="text-primary hover:underline">
        {children}
      </Link>
    </UserTooltip>
  );
};

export default LinkifyUsernameWithTooltip;
