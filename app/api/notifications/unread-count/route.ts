import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";

export async function GET() {
  try {
    const user = await validateUser();
    if (!user)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const unreadCount = await prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    });

    const data: NotificationCountInfo = {
      unreadCount,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
