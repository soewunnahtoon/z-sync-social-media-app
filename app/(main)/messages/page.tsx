import Messages from "@/components/messages";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

const MessagePage = () => {
  return <Messages />;
};

export default MessagePage;
