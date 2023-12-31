import {
  ChatHistoryProvider,
  ChatMessage,
  ChatSender,
} from "../domain/ChatApplication";
import { Subject, createSubject } from "./Observer";

const historyDefault: ChatMessage[] = [
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

export const MemoryProvider = (): ChatHistoryProvider & Subject => {
  const messages: ChatMessage[] = historyDefault;
  const subject = createSubject();

  async function getAll(): Promise<ChatMessage[]> {
    return messages;
  }

  async function save(message: ChatMessage): Promise<boolean> {
    messages.push(message);
    subject.notify();
    return true;
  }

  return {
    getAll,
    save,
    ...subject,
  };
};
