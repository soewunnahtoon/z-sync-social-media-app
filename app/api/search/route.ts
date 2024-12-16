import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getPostDataInclude, PostsPage } from "@/lib/utils/post-data-include";

export async function GET(req: NextRequest) {
  try {
    const user = await validateUser();
    if (!user)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const q = req.nextUrl.searchParams.get("q") || "";
    const searchQuery = q.split(" ").join(" & ");

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { content: { search: searchQuery } },
          { user: { name: { search: searchQuery } } },
          { user: { username: { search: searchQuery } } },
        ],
      },
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
