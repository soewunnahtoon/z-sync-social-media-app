import { Prisma } from "@prisma/client";
import { getUserDataSelect } from "@/lib/utils/user-data-select";

export const getPostDataInclude = (loggedInUserId: string) => {
  return {
    user: { select: getUserDataSelect(loggedInUserId) },
    attachments: true,
    likes: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    bookmarks: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude;
};

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostProps {
  post: PostData;
}

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}
