import { Prisma } from "@prisma/client";

export const getNotificationDataInclude = () => {
  return {
    issuer: {
      select: {
        name: true,
        username: true,
        avatarUrl: true,
      },
    },
    post: {
      select: {
        content: true,
      },
    },
  } satisfies Prisma.NotificationInclude;
};

export type NotificationData = Prisma.NotificationGetPayload<{
  include: ReturnType<typeof getNotificationDataInclude>;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}
