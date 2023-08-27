import * as React from "react";
import { ChatHistoryProvider, ChatMessage } from "../domain/ChatApplication";
import { Subject } from "../providers/Observer";

export const HistoryStateContext = React.createContext<ChatMessage[]>(null);

type HistoryStateProps = {
  children: React.ReactNode;
  provider: ChatHistoryProvider & Subject;
};

export const HistoryStateProvider = ({
  children,
  provider,
}: HistoryStateProps) => {
  const [data, setData] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await provider.getAll();
      setData(data);
    }

    provider.attach({
      update: () => provider.getAll().then(setData),
    });

    fetchData();
  }, []);

  return (
    <HistoryStateContext.Provider value={data}>
      {children}
    </HistoryStateContext.Provider>
  );
};
