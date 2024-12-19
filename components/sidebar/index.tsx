import Spinner from "@/components/Spinner";
import FollowSuggestions from "@/components/sidebar/FollowSuggestions";
import TrendingTopics from "@/components/sidebar/TrendingTopics";

import { Suspense } from "react";

const Sidebar = () => {
  return (
    <div className="sticky top-16 hidden h-fit w-56 flex-none space-y-2 md:block lg:w-72">
      <Suspense fallback={<Spinner />}>
        <FollowSuggestions />

        <TrendingTopics />
      </Suspense>
    </div>
  );
};
export default Sidebar;
