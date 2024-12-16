import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

import { cn } from "@/lib/utils";

const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="user-avatar"
      width={size ?? 36}
      height={size ?? 36}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className
      )}
    />
  );
};
export default UserAvatar;
