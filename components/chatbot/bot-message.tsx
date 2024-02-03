import React from 'react';

interface botMessageProps {
  message: string;
}

export default function BotMessage({ message }: botMessageProps) {
  return (
    <div className="flex justify-start">
      {/* User Message Container */}
      <div className="bg-secondary-500 rounded-lg p-[10px] max-w-[50%]">
        {/* User Message Text */}
        <p className="text-white text-medium">{message}</p>
      </div>
    </div>
  );
};
