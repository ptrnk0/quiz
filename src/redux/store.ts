import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questions/questionsSlice";
import answersReducer from "./answersSlice";

const store = configureStore({
  reducer: { questions: questionsReducer, answers: answersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
