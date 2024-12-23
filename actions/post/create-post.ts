"use server";

import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getPostDataInclude } from "@/lib/utils/post-data-include";
import { createPostSchema } from "@/schemas";

interface CreatePostProps {
  content: string;
  mediaIds: string[];
}

export const createPost = async (input: CreatePostProps) => {
  const user = await validateUser();
  if (!user) throw new Error("Unauthorized!");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });

  return newPost;
};
