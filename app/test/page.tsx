"use client";

import { useState } from "react";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

interface Messages {
  role: string;
  content: string;
}

export default function AssignmentBot() {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([{
    role: "system",
    content: "You are a subject tutor and are here to help students with their assignments. You can ask me anything about the assignment and I will help you with the answer."
  }]);
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
    <div className="bg-primary-900 h-full w-full">
      <div className="w-full">
        {messages.slice(1).map((message) =>
          message.role === "user" ? (
            <div className="inline-flex w-full">
              <div className="w-3/4"></div>
              <div className="w-1/4 inline-flex">
                <div className="w-full"></div>
                <div className="bg-primary-400 text-white rounded-xl p-2 w-fit whitespace-nowrap">
                  <p>{message.content as string}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-white rounded-xl w-1/2">
                <div className="bg-secondary-500 w-fit rounded-xl p-2">
                  <p className="w-fit">{message.content as string}</p>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <div className="inline-flex w-full rounded-xl bg-primary-900 border-primary-400 border-2 fixed bottom-0">
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
          Test
        </button>
      </div>
    </div>
  );
}
