"use client";

import useInitializeChatClient from "@/hooks/use-initialize-chat-client";
import ChatSidebar from "@/components/messages/chat-sidebar";
import ChatChannel from "@/components/messages/chat-channel";
import Spinner from "@/components/spinner";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";

export default function Messages() {
  const chatClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

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
}
