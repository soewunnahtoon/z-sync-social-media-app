import Sidebar from "@/components/sidebar";
import Notifications from "@/components/notifications";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

const NotificationsPage = () => {
  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <div className="rounded-2xl bg-card p-2 shadow-sm">
          <h1 className="text-center text-xl font-bold">Notifications</h1>
        </div>

        <Notifications />
      </div>

      <Sidebar />
    </main>
  );
};
export default NotificationsPage;
