// AssignmentText.tsx
import React from 'react';
import { Question } from '../../utils/types/assignments';

interface Props {
  question: Question;
}

const AssignmentText = ({ question }: Props) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="text-lg font-semibold mb-2">{question.text}</div>
      <textarea
        className="w-full p-2 border-2 border-gray-300 rounded-lg"
        rows={4}
        placeholder="Type your answer here"
      />
      {/* Implement the submit button functionality */}
    </div>
  );
};

export default AssignmentText;
