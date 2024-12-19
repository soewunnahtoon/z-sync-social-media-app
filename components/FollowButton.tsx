"use client";

import kyInstance from "@/lib/ky";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useFollowerInfo } from "@/hooks/use-follower-info";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
  className?: string;
}

const FollowButton = ({
  userId,
  initialState,
  className,
}: FollowButtonProps) => {
  const { toast } = useToast();
  const { data } = useFollowerInfo(userId, initialState);
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);

      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again!",
      });
    },
  });

  return (
    <Button
      size="sm"
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
      className={className}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};
export default FollowButton;
