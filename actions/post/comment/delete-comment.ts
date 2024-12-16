"use server";

import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getCommentDataInclude } from "@/lib/utils/comment-data-include";

export async function deleteComment(id: string) {
  const user = await validateUser();
  if (!user) throw new Error("Unauthorized!");

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error("Comment not found!");
  if (comment.userId !== user.id) throw new Error("Unauthorized!");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}
