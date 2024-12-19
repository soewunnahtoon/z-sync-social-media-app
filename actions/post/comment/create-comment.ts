"use server";

import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getCommentDataInclude } from "@/lib/utils/comment-data-include";
import { PostData } from "@/lib/utils/post-data-include";
import { createCommentSchema } from "@/schemas";

interface CreateComment {
  post: PostData;
  content: string;
}

export const createComment = async ({ post, content }: CreateComment) => {
  const user = await validateUser();
  if (!user) throw new Error("Unauthorized!");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),

    ...(post.user.id !== user.id
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.user.id,
              postId: post.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return newComment;
};
