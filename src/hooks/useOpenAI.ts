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

export function useOpenAI() {
  return (content: string) => {
    const completion: CreateChatCompletion = {
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.9,
    };

    return POST("/chat/completions", {
      body: completion,
    }).then((res) => res.data.choices[0].message.content);
  };
}
