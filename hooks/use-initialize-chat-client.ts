import kyInstance from "@/lib/ky";

import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useClientUser } from "@/hooks/use-client-user";

const useInitializeChatClient = () => {
  const user = useClientUser();

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    if (user) {
      client
        .connectUser(
          {
            id: user.id,
            username: user.username,
            name: user.name,
            image: user.avatarUrl,
          },

          async () =>
            kyInstance
              .get("/api/get-token")
              .json<{ token: string }>()
              .then((data) => data.token)
        )
        .then(() => setChatClient(client))
        .catch((error) => console.error("Failed to connect user", error));
    }

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .then(() => console.log("Connection closed"))
        .catch((error) => console.error("Failed to disconnect user", error));
    };
  }, [user]);

  return chatClient;
};
export default useInitializeChatClient;
