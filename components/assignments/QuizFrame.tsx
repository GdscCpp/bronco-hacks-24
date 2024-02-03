// QuizFrame.tsx
import React from 'react';
import { Question } from '../../utils/types/assignments';

interface Props {
  question: Question;
}

const QuizFrame: React.FC<Props> = ({ question }) => {
  // Based on question type, render the appropriate input elements
  // For this example, we'll assume it's a multiple-choice question
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="text-lg font-semibold mb-2">{question.text}</div>
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input type="radio" id={`option-${index}`} name="option" className="mr-2" />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
      {/* Implement the submit button functionality */}
    </div>
  );
};

export default QuizFrame;
