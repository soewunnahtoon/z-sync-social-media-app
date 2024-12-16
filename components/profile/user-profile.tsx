import EditProfileButton from "@/components/profile/edit-profile-button";
import UserAvatar from "@/components/user-avatar";
import FollowerCount from "@/components/follower-count";
import FollowButton from "@/components/follow-button";
import Linkify from "@/components/linkify";

import { formatDate } from "date-fns";
import { UserData } from "@/lib/utils/user-data-select";
import { formatNumber } from "@/lib/utils/format-number";

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

const UserProfile = async ({ user, loggedInUserId }: UserProfileProps) => {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId
    ),
  };

  return (
    <div className="h-fit w-full space-y-4 rounded-2xl bg-card px-4 py-2 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto w-48 h-48 max-h-60 max-w-60 rounded-full"
      />

      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        <div className="me-auto space-y-2">
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="text-muted-foreground text-sm">
              @{user.username}
            </div>
          </div>

          <div className="text-xs">
            Member since {formatDate(user.createdAt, "MMM d, yyyy")}
          </div>

          <div className="flex items-center gap-2">
            <span>
              Posts:{" "}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>

            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>

        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>

      {user.bio && (
        <>
          <Linkify>
            <div className="overflow-hidden whitespace-pre-line break-words text-sm">
              {user.bio}
            </div>
          </Linkify>

          <hr />
        </>
      )}
    </div>
  );
};

export default UserProfile;
