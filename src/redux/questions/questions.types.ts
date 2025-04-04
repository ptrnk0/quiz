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
