import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getPostDataInclude, PostsPage } from "@/lib/utils/post-data-include";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const user = await validateUser();
    if (!user)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const { userId } = await context.params;

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const posts = await prisma.post.findMany({
      where: { userId },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
