import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer, IAnswersState } from "../types/index.types";

const initialState: IAnswersState = {
  items: [],
  score: 0,
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswers(state, action: PayloadAction<IAnswer>) {
      state.items.push(action.payload);
    },
    changeScore(state, action) {
      state.score += action.payload;
    },
  },
});

export const { addAnswers, changeScore } = answersSlice.actions;
export default answersSlice.reducer;
