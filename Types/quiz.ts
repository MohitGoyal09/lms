interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export  interface QuizContent {
  questions: Question[];
  quizTitle: string;
  [key: string]: Question[] | string;
}

export  interface ApiResponse {
  id: number;
  courseId: string;
  content: QuizContent;
  type: string;
  status: string;
}

export interface Quiz {
  questionId: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
