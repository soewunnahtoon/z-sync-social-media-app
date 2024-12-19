import Bookmarks from "@/components/bookmarks";
import Sidebar from "@/components/sidebar";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
};

const BookmarksPage = () => {
  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <div className="rounded-2xl bg-card p-2 shadow-sm">
          <h1 className="text-center text-xl font-bold">Bookmarks</h1>
        </div>

        <Bookmarks />
      </div>

      <Sidebar />
    </main>
  );
};
export default BookmarksPage;
