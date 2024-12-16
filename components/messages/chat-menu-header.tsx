"use client";

import NewChatDialog from "@/components/messages/new-chat-dialog";

import { useState } from "react";
import { MailPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  onClose: () => void;
}

const ChatMenuHeader = ({ onClose }: MenuHeaderProps) => {
  const [showNewChatDialog, setShowNewChatDialog] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-2 p-2">
        <div className="h-full md:hidden">
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>

        <Button
          size="sm"
          variant="ghost"
          title="Start new chat"
          onClick={() => setShowNewChatDialog(true)}
        >
          <MailPlus className="size-4" />
        </Button>
      </div>

      {showNewChatDialog && (
        <NewChatDialog
          onOpenChange={setShowNewChatDialog}
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ChatMenuHeader;
