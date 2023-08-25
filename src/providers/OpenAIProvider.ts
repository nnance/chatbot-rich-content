import {
  ChatMessage,
  ChatProvider,
  ChatSender,
} from "../domain/ChatApplication";
import createClient from "openapi-fetch";
import { paths } from "../providers/openai";

type CreateChatCompletion =
  paths["/chat/completions"]["post"]["requestBody"]["content"]["application/json"];

const { POST } = createClient<paths>({
  baseUrl: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const sendMessage = async (
  message: ChatMessage,
  context: ChatMessage[]
): Promise<ChatMessage> => {
  const completion: CreateChatCompletion = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "user",
        content: message.content,
      },
    ],
    temperature: 0.9,
  };

  const results = await POST("/chat/completions", {
    body: completion,
  }).then((res) => res.data);

  return {
    id: context.length + 1,
    content: results.choices[0].message.content,
    sender: ChatSender.assistant,
  };
};

export const OpenAIProvider = (): ChatProvider => {
  return {
    sendMessage,
  };
};
