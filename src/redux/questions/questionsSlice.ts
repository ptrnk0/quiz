import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchQuestionsId } from "./questionsOps";
import { IQuestionsState } from "../../types/index.types";

const initialState: IQuestionsState = {
  items: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.fields.quizList;
      })
      .addMatcher(isAnyOf(fetchQuestionsId.pending), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchQuestionsId.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionsSlice.reducer;
