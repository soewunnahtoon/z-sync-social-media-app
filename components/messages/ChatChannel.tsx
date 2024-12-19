import {
  Channel,
  ChannelHeader,
  ChannelHeaderProps,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatChannelProps extends ChannelHeaderProps {
  open: boolean;
  openSidebar: () => void;
}

const ChatChannel = ({ open, openSidebar, ...props }: ChatChannelProps) => {
  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <Channel>
        <Window>
          <div className="flex items-center gap-2">
            <div className="h-full p-2 md:hidden">
              <Button size="sm" variant="ghost" onClick={openSidebar}>
                <Menu className="size-4" />
              </Button>
            </div>

            <ChannelHeader {...props} />
          </div>

          <MessageList />

          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
};
export default ChatChannel;
