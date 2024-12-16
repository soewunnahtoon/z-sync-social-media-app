import PostEditor from "@/components/editor";
import FollowingFeed from "@/components/main/following-feed";
import ForYouFeed from "@/components/main/for-you-feed";
import Sidebar from "@/components/sidebar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <PostEditor />

        <Tabs defaultValue="for-you">
          <TabsList className="w-full gap-2 shadow-sm">
            <TabsTrigger
              value="for-you"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground"
            >
              For You
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground"
            >
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>

      <Sidebar />
    </main>
  );
};
export default HomePage;
