import React, { useState } from "react";
import UserMessage from "./user-message";
import BotMessage from "./bot-message";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { Assignment } from "@/supabase/helper";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface ChatbotContainerProps {
  assignment?: Assignment;
}

const ChatbotContainer = ({ assignment }: ChatbotContainerProps) => {
  const data = JSON.stringify(assignment?.questions);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    {
      role: "system",
      content: `You are a subject tutor and are here to help students with their assignments. You can ask me anything about the assignment and I will help you with the answer.
          Here is the assignment data: ${data} Do not tell the user the direct answer. You can guide them to the answer.
        `,
    },
  ]);
  const [input, setInput] = useState<string>("");

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  const handleClick = async () => {
    const tempInput = input;
    setInput("");
    setMessages([...messages, { role: "user", content: tempInput }]);
    const result = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [...messages, { role: "user", content: tempInput }],
    });

    setMessages([
      ...messages,
      { role: "user", content: tempInput },
      { role: "assistant", content: result.choices[0].message.content },
    ]);
  };

  return (
    <DialogContent className="flex flex-col h-full p-[25px] space-y-[25px] bg-primary-900 border-solid border-2 border-gray-500 text-white rounded-[25px]">
      <DialogHeader>
        <DialogTitle>ClassBot</DialogTitle>
      </DialogHeader>
      {/* Messages */}
      <div className="flex-grow pt-[10px] space-y-[15px]">
        {messages.map((message, index) => {
          if (message.role === "user") {
            return (
              <UserMessage key={index} message={message.content as string} />
            );
          } else if (message.role === "assistant") {
            return (
              <BotMessage key={index} message={message.content as string} />
            );
          }
        })}
      </div>

      {/* User Input Bar */}
      <div className="h-[50px] rounded-[10px] border-solid border-2 border-gray-500 w-ful inline-flex">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full bg-primary-900 text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button
          className="bg-secondary-500 border-none text-white font-bold py-2 px-4"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </DialogContent>
  );
};

export default ChatbotContainer;
