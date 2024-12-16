"use client";

import LoadingButton from "@/components/loading-button";
import useDebounce from "@/hooks/use-debounce";
import SelectedUserTag from "@/components/messages/selected-user-tag";
import UserResult from "@/components/messages/user-result";
import Spinner from "@/components/spinner";

import { useState } from "react";
import { useClientUser } from "@/hooks/use-client-user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const NewChatDialog = ({ onOpenChange, onChatCreated }: NewChatDialogProps) => {
  const { toast } = useToast();
  const { client, setActiveChannel } = useChatContext();

  const loggedInUser = useClientUser();

  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  const [selectedUsers, setSelectedUsers] = useState<
    UserResponse<DefaultStreamChatGenerics>[]
  >([]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["stream-users", searchInputDebounced],
    queryFn: async () =>
      client.queryUsers(
        {
          id: { $ne: loggedInUser?.id! },
          role: { $ne: "admin" },
          ...(searchInputDebounced
            ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { username: { $autocomplete: searchInputDebounced } },
                ],
              }
            : {}),
        },
        { name: 1, username: 1 },
        { limit: 15 }
      ),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const channel = client.channel("messaging", {
        members: [loggedInUser?.id!, ...selectedUsers.map((u) => u.id)],
        name:
          selectedUsers.length > 1
            ? loggedInUser?.name +
              ", " +
              selectedUsers.map((u) => u.name).join(", ")
            : undefined,
      });
      await channel.create();
      return channel;
    },
    onSuccess: (channel) => {
      setActiveChannel(channel);
      onChatCreated();
    },
    onError(error) {
      console.error("Error starting chat", error);
      toast({
        variant: "destructive",
        description: "Error starting chat. Please try again.",
      });
    },
  });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="bg-card p-2">
        <DialogHeader className="p-2">
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>

        <div>
          <div className="group relative">
            <SearchIcon className="absolute right-5 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary" />

            <Input
              placeholder="Search Users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {!!selectedUsers.length && (
            <div className="my-2 flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <SelectedUserTag
                  key={user.id}
                  user={user}
                  onRemove={() => {
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id)
                    );
                  }}
                />
              ))}
            </div>
          )}

          {!!selectedUsers.length && <hr />}

          <div className="h-52 overflow-y-auto mt-2">
            {isSuccess &&
              data.users.map((user) => (
                <UserResult
                  key={user.id}
                  user={user}
                  selected={selectedUsers.some((u) => u.id === user.id)}
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.id === user.id)
                        ? prev.filter((u) => u.id !== user.id)
                        : [...prev, user]
                    );
                  }}
                />
              ))}

            {isSuccess && !data.users.length && (
              <p className="my-2 text-center text-muted-foreground">
                No users found. Try a different name.
              </p>
            )}

            {isFetching && <Spinner />}

            {isError && (
              <p className="my-2 text-center text-destructive">
                An error occurred while loading users.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <LoadingButton
            disabled={!selectedUsers.length}
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Start chat
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
