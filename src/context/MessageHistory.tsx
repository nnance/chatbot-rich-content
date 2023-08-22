import * as React from "react";

export type Message = {
  id: number;
  text: string | undefined;
  sender: "bot" | "user";
};

export type MessageHistory = Message[];

export enum MessageActionType {
  added,
  deleted,
}

interface MessageAction {
  type: MessageActionType;
  payload: {
    message: Message;
  };
}

type MessageDispatch = [MessageHistory, React.Dispatch<MessageAction>];

export const HistoryContext = React.createContext<MessageDispatch | null>(null);

export const historyDefault: MessageHistory = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "My Name is Nick.", sender: "user" },
  { id: 4, text: "What's your name?", sender: "user" },
  { id: 5, text: "My name is Chat-GPT", sender: "bot" },
  { id: 6, text: "Thank you for asking.", sender: "bot" },
  { id: 7, text: "How can I assist you today?", sender: "bot" },
];

export function historyReducer(
  history: MessageHistory,
  action: MessageAction
): MessageHistory {
  switch (action.type) {
    case MessageActionType.added: {
      return [...history, action.payload.message];
    }
    case MessageActionType.deleted: {
      return history.filter((m: Message) => m.id !== action.payload.message.id);
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
