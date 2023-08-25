import * as React from "react";
import { ChatMessage, ChatSender } from "../domain/ChatApplication";

export enum MessageActionType {
  added,
  deleted,
}

interface MessageAction {
  type: MessageActionType;
  payload: {
    message: ChatMessage;
  };
}

type MessageDispatch = [ChatMessage[], React.Dispatch<MessageAction>];

export const HistoryContext = React.createContext<MessageDispatch | null>(null);

export const historyDefault: ChatMessage[] = [
  { id: 1, content: "Hi there!", sender: ChatSender.assistant },
  { id: 2, content: "Hello!", sender: ChatSender.user },
  { id: 3, content: "My Name is Nick.", sender: ChatSender.user },
  { id: 4, content: "What's your name?", sender: ChatSender.user },
  { id: 5, content: "My name is Chat-GPT", sender: ChatSender.assistant },
  { id: 6, content: "Thank you for asking.", sender: ChatSender.assistant },
  {
    id: 7,
    content: "How can I assist you today?",
    sender: ChatSender.assistant,
  },
];

export function historyReducer(
  history: ChatMessage[],
  action: MessageAction
): ChatMessage[] {
  switch (action.type) {
    case MessageActionType.added: {
      return [...history, action.payload.message];
    }
    case MessageActionType.deleted: {
      return history.filter(
        (m: ChatMessage) => m.id !== action.payload.message.id
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const HistoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const historyDispatch = React.useReducer(historyReducer, historyDefault);

  return (
    <HistoryContext.Provider value={historyDispatch}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useMessageHistory = () => {
  const context = React.useContext(HistoryContext);

  if (context === null) {
    throw new Error("HistoryContext was used outside of its Provider");
  }
  return context;
};
