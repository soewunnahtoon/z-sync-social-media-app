import Link from "next/link";
import streamServerClient from "@/lib/stream";
import UserAvatar from "@/components/user-avatar";
import MessageButton from "@/components/menu-bar/message-button";
import NotificationButton from "@/components/menu-bar/notification-button";

import { Bookmark, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { validateUser } from "@/actions/auth/validate-user";

const MenuBar = async ({ className }: MenuBarProps) => {
  const user = await validateUser();
  if (!user) return null;

  const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-2"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      <NotificationButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />

      <MessageButton initialState={{ unreadCount: unreadMessagesCount }} />

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-2"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-2"
        title={user.name}
        asChild
      >
        <Link href={`/${user.username}`}>
          <UserAvatar avatarUrl={user.avatarUrl} size={24} />
          <span className="hidden lg:inline">{user.name}</span>
        </Link>
      </Button>
    </div>
  );
};

export default MenuBar;
