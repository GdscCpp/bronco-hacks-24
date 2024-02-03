export type QuestionType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'numericAnswer';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
}

export interface Assignment {
  id: number;
  name: string;
  questions: Question[];
  value: number;
}
