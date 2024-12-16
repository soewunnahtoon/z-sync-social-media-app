import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import {
  CommentsPage,
  getCommentDataInclude,
} from "@/lib/utils/comment-data-include";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const user = await validateUser();
    if (!user)
      return Response.json({ error: "Unauthorized!" }, { status: 401 });

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 5;

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comments.length > pageSize ? comments[0].id : null;

    const data: CommentsPage = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error!" }, { status: 500 });
  }
}
