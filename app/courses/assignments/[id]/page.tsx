"use client";

import React from 'react';
import AssignmentText from '@/components/assignments/AssignmentText';
import AssignmentMedia from '@/components/assignments/AssignmentMedia';
import QuizFrame from '@/components/assignments/QuizFrame';
import { Assignment, Question } from '@/utils/types/assignments';
import { createClient } from '@/utils/supabase/client';
import { set } from 'react-hook-form';
import { useParams } from 'next/navigation';

const AssignmentsPage = () => {
    const supabase = createClient();
    const { id } = useParams();
    const fetchAssignments = async () => {
        const { data, error } = await supabase.from('assignments').select('*').eq('id', id);
        if (error) {
            console.error(error);
            return;
        }
        setAssignment1(data);
    }
    const [assignments, setAssignments] = React.useState<Assignment[]>([]);
    const [assignment1, setAssignment1] = React.useState<any>();
    
    /*
    const mockAssignment: Assignment = {
        id: 1,
        name: 'Test Assignment',
        questions: [
            {
                id: 1,
                text: 'What is the capital of France?',
                type: 'multipleChoice',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctAnswer: 'Paris',
                points: 10,
            },
            {
                id: 2,
                text: 'Is the sun hot?',
                type: 'trueFalse',
                options: ['true', 'false'],
                correctAnswer: 'true',
                points: 5,
            },
            {
                id: 3,
                text: 'What is the capital of Germany?',
                type: 'shortAnswer',
                correctAnswer: 'Berlin',
                points: 15,
            },
            {
                id: 4,
                text: 'What is 2 + 2?',
                type: 'numericAnswer',
                correctAnswer: '4',
                points: 20,
            },
        ],
        value: 92,
    };
    */

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{assignment1.name}</h1>
      {/* Loop through questions and render the appropriate component */}
      {assignment1.questions.map((question: Question) => {
        switch (question.type) {
          case 'multipleChoice':
          case 'trueFalse':
            return <QuizFrame key={question.id} question={question} />;
          case 'shortAnswer':
          case 'numericAnswer':
            return <AssignmentText key={question.id} question={question} />;
          default:
            return null;
        }
      })}
      {/* Implement the AssignmentMedia component if needed */}
    </div>
  );
};

export default AssignmentsPage;
