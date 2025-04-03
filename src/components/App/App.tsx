import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import Quiz from "../../pages/Quiz/Quiz";

function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:quizId" element={<Quiz />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
