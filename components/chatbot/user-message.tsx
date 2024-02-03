import React from 'react';

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end">
      {/* User Message Container */}
      <div className="bg-primary-400 rounded-lg p-[10px] max-w-[50%]">
        {/* User Message Text */}
        <p className="text-white text-medium">{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;