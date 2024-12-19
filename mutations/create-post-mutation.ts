import {
  InfiniteData,
  Query,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost } from "@/actions/post/create-post";
import { useToast } from "@/hooks/use-toast";
import { useClientUser } from "@/hooks/use-client-user";
import { PostsPage } from "@/lib/utils/post-data-include";

export const CreatePostMutation = () => {
  const user = useClientUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createPost,

    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error
      > = {
        queryKey: ["post-feed"],
        predicate: (
          query: Query<InfiniteData<PostsPage, string | null>, Error>
        ) => {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user?.id))
          );
        },
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate: (
          query: Query<InfiniteData<PostsPage, string | null>, Error>
        ) => {
          return queryFilter.predicate!(query) && !query.state.data;
        },
      });

      toast({ description: "Post created." });
    },

    onError: (error) => {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Failed to post. Please try again!",
      });
    },
  });

  return mutation;
};
