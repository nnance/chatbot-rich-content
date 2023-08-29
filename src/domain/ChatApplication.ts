export interface QueryUseCase {
  query: (query: string) => Promise<string>;
}

export enum ChatSender {
  user,
  system,
  assistant,
}

export interface ChatMessage {
  id: number;
  content: string;
  sender: ChatSender;
}

export interface ChatProvider {
  sendMessage(
    message: ChatMessage,
    context: ChatMessage[]
  ): Promise<ChatMessage>;
}

export interface ChatHistoryProvider {
  getAll(): Promise<ChatMessage[]>;
  save(message: ChatMessage): Promise<boolean>;
}

export const ChatApplication = (
  provider: ChatProvider,
  history: ChatHistoryProvider
): QueryUseCase => {
  async function query(query: string): Promise<string> {
    const context = await history.getAll();
    const message: ChatMessage = {
      id: context.length + 1,
      content: query,
      sender: ChatSender.user,
    };

    return history.save(message).then(async () => {
      const result = await provider.sendMessage(message, context);
      history.save(result);

      return result.content;
    });
  }

  return {
    query,
  };
};
