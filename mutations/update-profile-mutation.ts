import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";
import { updateProfile } from "@/actions/profile/update-profile";
import { updateProfileSchema } from "@/schemas";
import { PostsPage } from "@/lib/utils/post-data-include";
import { useToast } from "@/hooks/use-toast";

interface UpdateProfile {
  avatar?: File;
  values: z.infer<typeof updateProfileSchema>;
}

export const UpdateProfileMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  const mutation = useMutation({
    mutationFn: async ({ avatar, values }: UpdateProfile) => {
      return Promise.all([
        avatar && startAvatarUpload([avatar]),
        updateProfile({ values }),
      ]);
    },

    onSuccess: async ([uploadResult, updatedUser]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error
      > = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
              nextCursor: page.nextCursor,
            })),
          };
        }
      );

      router.refresh();

      toast({ description: "Profile updated." });
    },

    onError: (error) => {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again!",
      });
    },
  });

  return mutation;
};
