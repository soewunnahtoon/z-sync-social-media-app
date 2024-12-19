import Post from "@/components/post";
import Spinner from "@/components/Spinner";
import UserInfoSidebar from "@/components/post/UserInfoSidebar";

import { cache, Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";
import { getPostDataInclude } from "@/lib/utils/post-data-include";

interface PostPageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: getPostDataInclude(loggedInUserId),
  });
  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params: { postId },
}: PostPageProps): Promise<Metadata> {
  const user = await validateUser();
  if (!user) return {};

  const post = await getPost(postId, user.id);

  return { title: `${post.user.name}: ${post.content.slice(0, 50)}...` };
}

const PostPage = async ({ params: { postId } }: PostPageProps) => {
  const user = await validateUser();
  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page!
      </p>
    );
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <Post post={post} />
      </div>

      <div className="sticky top-16 hidden h-fit w-56 flex-none md:block lg:w-72">
        <Suspense fallback={<Spinner />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
};
export default PostPage;
