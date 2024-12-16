import { Skeleton } from "@/components/ui/skeleton";

function PostLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-2 rounded-2xl bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="size-12 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
}

const PostsLoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
};

export default PostsLoadingSkeleton;
