import * as React from "react";
import { HistoryStateContext } from "../context/HistoryState";
import { ChatApplication } from "../domain/ChatApplication";
import { OpenAIProvider } from "../providers/OpenAIProvider";

export function useChatApp() {
  const llm = OpenAIProvider();
  const { provider } = React.useContext(HistoryStateContext);
  return ChatApplication(llm, provider);
}
