import Sidebar from "@/components/sidebar";
import UserPosts from "@/components/profile/UserPosts";
import UserProfile from "@/components/profile/UserProfile";

import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/utils/user-data-select";
import { validateUser } from "@/actions/auth/validate-user";

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });
  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const loggedInUser = await validateUser();
  if (!loggedInUser) return {};

  const user = await getUser(params.username, loggedInUser.id);

  return { title: `${user.name} (@${user.username})` };
}

const ProfilePage = async ({
  params: paramsPromise,
}: {
  params: Promise<{ username: string }>;
}) => {
  const params = await paramsPromise;
  const loggedInUser = await validateUser();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page!
      </p>
    );
  }

  const user = await getUser(params.username, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />

        <div className="rounded-2xl bg-card p-2 shadow-sm">
          <h1 className="text-center text-xl font-bold">
            {user.name}&apos;s posts
          </h1>
        </div>

        <UserPosts userId={user.id} />
      </div>

      <Sidebar />
    </main>
  );
};
export default ProfilePage;
