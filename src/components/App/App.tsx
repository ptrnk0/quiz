import "./App.module.css";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchQuestionsId } from "../../redux/questions/questionsOps";
import { useAppDispatch } from "../../hooks";
import Layout from "../Layout/Layout";
import Quiz from "../../pages/Quiz/Quiz";
import Home from "../../pages/Home/Home";
import Results from "../../pages/Results/Results";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionsId());
  });

  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:quizId" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
