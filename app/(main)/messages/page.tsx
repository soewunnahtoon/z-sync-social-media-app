import Messages from "@/components/messages";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

const MessagesPage = () => {
  return <Messages />;
};
export default MessagesPage;
