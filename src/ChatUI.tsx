import * as React from "react";

import { Box } from "@mui/material";
import { ChatHistory } from "./components/ChatHistory";
import { ChatInput } from "./components/ChatInput";
import {
  Message,
  MessageActionType,
  useMessageHistory,
} from "./context/MessageHistory";

export const ChatUI = () => {
  //   const { isOnline, apiKey } = useAppConfig();
  const [history, historyDispatch] = useMessageHistory();
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //   const sendMessageToBot = useCallOpenAI(isOnline ? apiKey : undefined, true);

  const createHistory = () => {
    const user: Message = {
      id: history.length + 1,
      text: input.trim(),
      sender: "user",
    };
    const bot: Message = {
      id: history.length + 2,
      text: undefined,
      sender: "bot",
    };
    return { user, bot };
  };

  const saveToHistory = (opts: Message | Message[]) => {
    const messages = Array.isArray(opts) ? opts : [opts];
    messages.forEach((message) =>
      historyDispatch({
        type: MessageActionType.added,
        payload: { message },
      })
    );
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    setIsLoading(true);
    setInput("");

    const { user, bot } = createHistory();
    saveToHistory([user, bot]);

    // bot.text = await sendMessageToBot(input);
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        bgcolor: "grey.200",
      }}
    >
      <ChatHistory messages={history} />
      <ChatInput
        input={input}
        isLoading={isLoading}
        handleInputChange={setInput}
        handleSend={handleSend}
      />
    </Box>
  );
};
