"use client";

import Spinner from "@/components/Spinner";
import ChatSidebar from "@/components/messages/ChatSidebar";
import ChatChannel from "@/components/messages/ChatChannel";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Chat as StreamChat } from "stream-chat-react";
import { useInitializeChatClient } from "@/hooks/use-initialize-chat-client";

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const chatClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();

  if (!chatClient) return <Spinner />;

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-xl">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
};
export default Messages;
