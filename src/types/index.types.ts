export interface IQuizPossibleAnswers {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface IQuizResponse {
  id: number;
  questionText: string;
  possibleAnswers: IQuizPossibleAnswers[];
  questionType: string;
}

export interface IAnswer {
  quizId: number;
  selectedAnswers: IQuizPossibleAnswers[];
}

export interface IAnswersState {
  items: IAnswer[];
  score: number;
}

export interface IQuestionsItems {
  sys: { id: string };
}

export interface IQuestionsIdResponse {
  fields: {
    quizList: IQuestionsItems[];
  };
}

export interface IQuestionsState {
  items: IQuestionsItems[];
  loading: boolean;
  error: null | unknown;
}
