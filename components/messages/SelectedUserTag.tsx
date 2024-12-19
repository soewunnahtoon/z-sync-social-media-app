import UserAvatar from "@/components/UserAvatar";

import { X } from "lucide-react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

interface SelectedUserTagProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  onRemove: () => void;
}

const SelectedUserTag = ({ user, onRemove }: SelectedUserTagProps) => {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-2 rounded-full border p-1 hover:bg-muted/50"
    >
      <UserAvatar avatarUrl={user.image} size={20} />

      <p className="font-bold text-xs">{user.name}</p>

      <X className="size-4 text-muted-foreground" />
    </button>
  );
};
export default SelectedUserTag;
