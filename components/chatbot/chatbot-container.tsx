import React from 'react';
import UserMessage from './user-message';
import BotMessage from './bot-message';

const ChatbotContainer = () => {
  return (
    <div className="flex flex-col h-full p-[25px] space-y-[25px] bg-primary-900 border-solid border-2 border-gray-500 text-white rounded-[25px]">
      {/* Header */}
      <div className="flex justify-between items-center p-0 m-0">
        <h2 className="font-bold text-2xl">Chatithan</h2>
        <h2>O</h2>
      </div>

      {/* Messages */}
      <div className="flex-grow pt-[10px] space-y-[15px]">
        <UserMessage message="What is up" />
        <BotMessage message="Your mom har har har har har" />
      </div>

      {/* User Input Bar */}
      <div className="h-[50px] rounded-[10px] border-solid border-2 border-gray-500">
        {/* Input elements go here */}
      </div>
    </div>

  );
};

export default ChatbotContainer;
