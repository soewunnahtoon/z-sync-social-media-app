import kyInstance from "@/lib/ky";
import Comment from "@/components/post/comment/Comment";
import CommentInput from "@/components/post/comment/CommentInput";
import Spinner from "@/components/Spinner";

import { useInfiniteQuery } from "@tanstack/react-query";
import { PostData } from "@/lib/utils/post-data-include";
import { CommentsPage } from "@/lib/utils/comment-data-include";
import { Button } from "@/components/ui/button";

interface CommentsProps {
  post: PostData;
}

const Comments = ({ post }: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {}
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-2">
      <CommentInput post={post} />

      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}

      {status === "pending" && <Spinner />}

      {status === "success" && !comments.length && (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      )}

      {status === "error" && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}

      <div className="divide-y">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default Comments;
