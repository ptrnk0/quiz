import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { IQuestionsItems } from "../../redux/questions/questions.types";
import ButtonLink from "../ButtonLink/ButtonLink";
import QuizForm from "../QuizForm/QuizForm";
import { IQuizResponse } from "../../types/index.types";

interface IQuizCardProps {
  quizId: string | undefined;
}

axios.defaults.baseURL = "https://cdn.contentful.com";

const QuizCard: React.FC<IQuizCardProps> = ({ quizId }) => {
  const [quiz, setQuiz] = useState<IQuizResponse>();
  const [prevQuiz, setPrevQuiz] = useState<null | IQuestionsItems>(null);
  const [nextQuiz, setNextQuiz] = useState<null | IQuestionsItems>(null);
  const quizList = useAppSelector((state) => state.questions.items);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://cdn.contentful.com/spaces/${import.meta.env.VITE_SPACE_ID}/environments/${import.meta.env.VITE_ENVIRONMENTS}/entries/${quizId}?access_token=${import.meta.env.VITE_ACCESS_TOKEN}`,
        );
        setQuiz(data.fields);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [quizId]);

  useEffect(() => {
    const foundQuiz = quizList.find((quiz) => quiz.sys.id === quizId);
    const currentQuizIndex = foundQuiz ? quizList.indexOf(foundQuiz) : -1;

    setPrevQuiz(null);
    setNextQuiz(null);

    if (currentQuizIndex > 0) {
      setPrevQuiz(quizList[currentQuizIndex - 1]);
    }
    if (currentQuizIndex < quizList.length - 1 && currentQuizIndex >= 0) {
      setNextQuiz(quizList[currentQuizIndex + 1]);
    }
  }, [quizList, quizId]);

  return (
    <section className="absolute top-1/2 left-1/2 z-1 m-auto flex h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 flex-col justify-center border-2 border-black bg-pink-100 px-5 py-10 lg:h-1/2 lg:w-200">
      {quiz && (
        <>
          <h2 className="mb-5 text-center text-xl font-bold text-pretty md:mb-10 md:text-2xl">
            {quiz.questionText}
          </h2>
          <QuizForm quiz={quiz} />
        </>
      )}
      <ul className="mt-auto flex flex-wrap justify-between gap-2 md:justify-around">
        <li>
          <ButtonLink link={prevQuiz}>Prev</ButtonLink>
        </li>

        <li className="-order-1 flex w-full grow-1 justify-center self-center md:order-0 md:block md:w-auto md:grow-0">
          <button
            form="quiz-form"
            type="submit"
            className="text-md w-full cursor-pointer border-2 border-black bg-yellow-400 px-3 py-1 transition-colors duration-300 ease-in hover:bg-yellow-500 md:text-xl"
          >
            Submit
          </button>
        </li>
        <li>
          <ButtonLink link={nextQuiz}>Next</ButtonLink>
        </li>
      </ul>
    </section>
  );
};

export default QuizCard;
