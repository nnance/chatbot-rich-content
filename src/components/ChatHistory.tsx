import * as React from "react";
import { Box } from "@mui/material";

import { ChatMessage, MessageOrder } from "./ChatMsg";
import { Message } from "../context/MessageHistory";

const getMessageOrder = (
  messages: Message[],
  message: Message,
  index: number
) => {
  const { sender } = message;
  const { sender: nextSender } =
    index < messages.length - 1 ? messages[index + 1] : { sender: "" };
  const { sender: previousSender } =
    index > 0 ? messages[index - 1] : { sender: "" };

  return sender !== previousSender
    ? MessageOrder.First
    : sender === nextSender
    ? MessageOrder.Middle
    : MessageOrder.Last;
};

export const ChatHistory = ({ messages }: { messages: Message[] }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    if (!bottomRef.current) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottomRef, messages]);

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
      {messages.map((message, index) => {
        const order = getMessageOrder(messages, message, index);
        return <ChatMessage key={message.id} message={message} order={order} />;
      })}
      <div ref={bottomRef} />
    </Box>
  );
};
