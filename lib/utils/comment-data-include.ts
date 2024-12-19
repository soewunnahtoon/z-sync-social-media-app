import { Prisma } from "@prisma/client";
import { getUserDataSelect } from "@/lib/utils/user-data-select";

export const getCommentDataInclude = (loggedInUserId: string) => {
  return {
    user: { select: getUserDataSelect(loggedInUserId) },
  } satisfies Prisma.CommentInclude;
};

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}
