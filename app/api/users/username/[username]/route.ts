import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getUserDataSelect } from "@/lib/utils/user-data-select";

export async function GET(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  try {
    const loggedInUser = await validateUser();
    if (!loggedInUser)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUser.id),
    });

    if (!user) {
      return Response.json({ error: "User not found!" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
