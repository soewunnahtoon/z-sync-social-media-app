import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import {
  getNotificationDataInclude,
  NotificationsPage,
} from "@/lib/utils/notification-data-include";

export async function GET(req: NextRequest) {
  try {
    const user = await validateUser();
    if (!user)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const notifications = await prisma.notification.findMany({
      where: { recipientId: user.id },
      include: getNotificationDataInclude(),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      notifications.length > pageSize ? notifications[pageSize].id : null;

    const data: NotificationsPage = {
      notifications: notifications.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
