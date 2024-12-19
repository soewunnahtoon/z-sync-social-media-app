import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import FollowButton from "@/components/FollowButton";

import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getUserDataSelect } from "@/lib/utils/user-data-select";

const FollowSuggestions = async () => {
  const user = await validateUser();
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: { id: user.id },
      followers: {
        none: { followerId: user.id },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="space-y-4 rounded-2xl bg-card px-4 py-2 shadow-xl">
      <div className="text-lg lg:text-xl font-bold">Follow Suggestions</div>

      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-2">
          <UserTooltip user={user}>
            <Link
              href={`/${user.username}`}
              className="flex items-center gap-2"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />

              <div>
                <p className="line-clamp-1 break-all font-semibold hover:underline text-sm">
                  {user.name}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground text-xs">
                  @{user.username}
                </p>
              </div>
            </Link>
          </UserTooltip>

          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default FollowSuggestions;
