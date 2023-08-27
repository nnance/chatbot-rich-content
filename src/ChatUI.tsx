import * as React from "react";

import { Box } from "@mui/material";
import { ChatHistory } from "./components/ChatHistory";
import { ChatInput } from "./components/ChatInput";
import { HistoryStateContext } from "./context/HistoryState";

export const ChatUI = () => {
  const history = React.useContext(HistoryStateContext);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    setIsLoading(true);
    setInput("");

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
