import Spinner from "@/components/spinner";
import FollowSuggestions from "@/components/sidebar/follow-suggestions";
import TrendingTopics from "@/components/sidebar/trending-topics";

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
