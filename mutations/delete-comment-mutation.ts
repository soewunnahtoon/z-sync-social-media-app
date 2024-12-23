import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment } from "@/actions/post/comment/delete-comment";
import { useToast } from "@/hooks/use-toast";
import { CommentsPage } from "@/lib/utils/comment-data-include";

export const DeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              comments: page.comments.filter((c) => c.id !== deletedComment.id),
              previousCursor: page.previousCursor,
            })),
          };
        }
      );

      toast({ description: "Comment deleted." });
    },

    onError: (error) => {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Failed to delete comment. Please try again!",
      });
    },
  });

  return mutation;
};
