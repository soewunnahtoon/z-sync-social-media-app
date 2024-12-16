"use client";

import ChatMenuHeader from "@/components/messages/chat-menu-header";

import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import { useClientUser } from "@/hooks/use-client-user";
import { useRouter } from "next/navigation";

const ChatSidebar = ({ open, onClose }: ChatSidebarProps) => {
  const user = useClientUser();
  const queryClient = useQueryClient();
  const { channel } = useChatContext();
  const router = useRouter();

  useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
    }
  }, [channel?.id, queryClient]);

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );

  if (!user) {
    return router.push("/login");
  }

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden"
      )}
    >
      <ChatMenuHeader onClose={onClose} />

      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
};
export default ChatSidebar;
