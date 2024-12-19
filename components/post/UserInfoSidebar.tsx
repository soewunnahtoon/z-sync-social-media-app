import Link from "next/link";
import UserTooltip from "@/components/UserTooltip";
import UserAvatar from "@/components/UserAvatar";
import Linkify from "@/components/linkify";
import FollowButton from "@/components/FollowButton";

import { validateUser } from "@/actions/auth/validate-user";
import { UserData } from "@/lib/utils/user-data-select";

interface UserInfoSidebarProps {
  user: UserData;
}

const UserInfoSidebar = async ({ user }: UserInfoSidebarProps) => {
  const loggedInUser = await validateUser();
  if (!loggedInUser) return null;

  return (
    <div className="space-y-4 rounded-2xl bg-card px-4 py-2 shadow-xl">
      <div className="text-lg lg:text-xl font-bold">About this user</div>

      <UserTooltip user={user}>
        <Link href={`/${user.username}`} className="flex items-center gap-2">
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

      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground text-sm">
          {user.bio}
        </div>
      </Linkify>

      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id
            ),
          }}
        />
      )}
    </div>
  );
};

export default UserInfoSidebar;
