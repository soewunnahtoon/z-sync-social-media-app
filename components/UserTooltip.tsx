"use client";

import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import Linkify from "@/components/linkify";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";

import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientUser } from "@/hooks/use-client-user";
import { UserData } from "@/lib/utils/user-data-select";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

const UserTooltip = ({ children, user }: UserTooltipProps) => {
  const loggedInUser = useClientUser();

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser?.id
    ),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-2 break-words p-2 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/${user.username}`}>
                <UserAvatar size={48} avatarUrl={user.avatarUrl} />
              </Link>

              <Link href={`/${user.username}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user.name}
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>

            <div>
              {loggedInUser?.id !== user.id && (
                <FollowButton
                  userId={user.id}
                  initialState={followerState}
                  className="w-full bg-white text-black dark:bg-black dark:text-white"
                />
              )}
            </div>

            {user.bio && (
              <Linkify>
                <div className="line-clamp-2 whitespace-pre-line">
                  {user.bio}
                </div>
              </Linkify>
            )}

            <FollowerCount userId={user.id} initialState={followerState} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default UserTooltip;
