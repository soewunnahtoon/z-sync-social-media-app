import Link from "next/link";
import UserAvatar from "@/components/user-avatar";

import { JSX } from "react";
import { cn } from "@/lib/utils";
import { NotificationData } from "@/lib/utils/notification-data-include";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2 } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/format-date";

interface NotificationProps {
  notification: NotificationData;
}

const Notification = ({ notification }: NotificationProps) => {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `followed you.`,
      icon: <User2 className="size-6 text-primary" />,
      href: `/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `commented on your post.`,
      icon: <MessageCircle className="size-6 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `liked your post.`,
      icon: <Heart className="size-6 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-4 rounded-2xl bg-card p-4 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10"
        )}
      >
        <div className="my-1">{icon}</div>

        <UserAvatar avatarUrl={notification.issuer.avatarUrl} />

        <div className="flex flex-col justify-start gap-1">
          <div>
            <span className="font-bold">{notification.issuer.name}</span>{" "}
            <span>{message}</span>
          </div>

          {notification.post && (
            <div className="line-clamp-1 whitespace-pre-line text-muted-foreground text-sm">
              {notification.post.content}
            </div>
          )}

          <div
            className="text-xs text-muted-foreground"
            suppressHydrationWarning
          >
            {formatRelativeDate(notification.createdAt)}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Notification;
