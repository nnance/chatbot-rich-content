import * as React from "react";
import { ChatHistoryProvider, ChatMessage } from "../domain/ChatApplication";
import { Subject } from "../providers/Observer";

export interface HistoryState {
  history: ChatMessage[];
  provider: ChatHistoryProvider;
}

export const HistoryStateContext = React.createContext<HistoryState>(null);

type HistoryStateProps = {
  children: React.ReactNode;
  provider: ChatHistoryProvider & Subject;
};

export const HistoryStateProvider = ({
  children,
  provider,
}: HistoryStateProps) => {
  const [history, setData] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await provider.getAll();
      setData(data);
    }

    provider.attach({
      update: () => {
        console.log("update");
        provider.getAll().then((data) => {
          console.dir(data);
          setData(data);
        });
      },
    });

    fetchData();
  }, []);

  return (
    <HistoryStateContext.Provider value={{ history, provider }}>
      {children}
    </HistoryStateContext.Provider>
  );
};
