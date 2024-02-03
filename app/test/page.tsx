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
    setMessages([...messages, { role: "user", content: input }]);
    const result = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: result.choices[0].message.content },
    ]);
    setInput("");
  };

  return (
    <div className="bg-blue-500">
      <h1>Assignment Bot</h1>
      <div className={"bg-blue-500"}>
        {messages.map((message) => (
          <div>{message.content || ""}</div>
        ))}
      </div>
      <input onChange={(e) => setInput(e.target.value)} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Test
      </button>
    </div>
  );
}
