import UserAvatar from "@/components/UserAvatar";

import { Check } from "lucide-react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

interface UserResultProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  selected: boolean;
  onClick: () => void;
}

const UserResult = ({ user, selected, onClick }: UserResultProps) => {
  return (
    <button
      className="flex w-full items-center justify-between p-2 transition-colors hover:bg-muted/50"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <UserAvatar avatarUrl={user.image} className="flex-none" />

        <div>
          <p className="line-clamp-1 break-all font-semibold text-sm text-start">
            {user.name}
          </p>

          <p className="line-clamp-1 break-all text-muted-foreground text-xs text-start">
            @{user.username}
          </p>
        </div>
      </div>

      {selected && <Check className="size-4 text-green-500" />}
    </button>
  );
};
export default UserResult;
