import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import {
  IAnswer,
  IQuestionsItems,
  IQuizPossibleAnswers,
  IQuizResponse,
} from "../../types/index.types";
import QuizForm from "../QuizForm/QuizForm";
import ButtonLink from "../ButtonLink/ButtonLink";
import { contentfulAxios } from "../../redux/questions/questionsOps";

interface IQuizCardProps {
  quizId: string | undefined;
}

const QuizCard: React.FC<IQuizCardProps> = ({ quizId }) => {
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState<IQuizResponse>();
  const [prevQuiz, setPrevQuiz] = useState<null | IQuestionsItems>(null);
  const [nextQuiz, setNextQuiz] = useState<null | IQuestionsItems>(null);
  const [answersForCurrentQuiz, setAnswersForCurrentQuiz] = useState<
    undefined | IQuizPossibleAnswers[]
  >();
  const [currentQuizStep, setCurrentQuizStep] = useState<number>();
  const quizzesList = useAppSelector((state) => state.questions.items);
  const allAnswers = useAppSelector((state) => state.answers.items);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await contentfulAxios.get(
          `/spaces/${import.meta.env.VITE_SPACE_ID}/environments/${import.meta.env.VITE_ENVIRONMENTS}/entries/${quizId}?access_token=${import.meta.env.VITE_ACCESS_TOKEN}`,
        );
        setQuiz(data.fields);
      } catch {
        setError(true);
      }
    })();
  }, [quizId]);

  useEffect(() => {
    if (allAnswers.length !== 0 && quiz) {
      const answersForCurrentQuiz: IAnswer | undefined = allAnswers.find(
        (answer) => {
          return answer.quizId === quiz.id;
        },
      );

      setAnswersForCurrentQuiz(answersForCurrentQuiz?.selectedAnswers);
    }
  }, [allAnswers, quiz]);

  useEffect(() => {
    const foundQuiz = quizzesList.find((quiz) => quiz.sys.id === quizId);
    const currentQuizIndex = foundQuiz ? quizzesList.indexOf(foundQuiz) : -1;
    setCurrentQuizStep(currentQuizIndex + 1);

    setPrevQuiz(null);
    setNextQuiz(null);

    if (currentQuizIndex > 0) {
      setPrevQuiz(quizzesList[currentQuizIndex - 1]);
    }
    if (currentQuizIndex < quizzesList.length - 1 && currentQuizIndex >= 0) {
      setNextQuiz(quizzesList[currentQuizIndex + 1]);
    }
  }, [quizzesList, quizId]);

  if (error) {
    return (
      <p className="text-center uppercase">
        Something went wrong, please try again.
      </p>
    );
  }

  return (
    <section className="absolute top-1/2 left-1/2 z-1 m-auto flex h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 flex-col justify-center border-2 border-black bg-pink-100 px-5 py-10 lg:h-1/2 lg:w-200">
      {quiz && (
        <>
          <h2 className="mb-5 text-center text-xl font-bold text-pretty md:mb-10 md:text-2xl">
            {quiz.questionText}
          </h2>
          <QuizForm quiz={quiz} answers={answersForCurrentQuiz} />
        </>
      )}
      <ul className="m-auto flex flex-wrap justify-between gap-2 md:justify-around">
        {prevQuiz ? (
          <ButtonLink link={prevQuiz.sys.id}>Prev</ButtonLink>
        ) : (
          <ButtonLink link="">Home</ButtonLink>
        )}

        {!answersForCurrentQuiz && (
          <li className="-order-1 flex w-full grow-1 justify-center self-center md:order-0 md:block md:w-auto md:grow-0">
            <button
              form="quiz-form"
              type="submit"
              className="text-md w-full cursor-pointer border-2 border-black bg-yellow-400 px-3 py-1 transition-colors duration-300 ease-in hover:bg-yellow-500 md:text-xl"
            >
              Submit
            </button>
          </li>
        )}
        <li>
          {nextQuiz ? (
            <ButtonLink link={nextQuiz.sys.id}>Next</ButtonLink>
          ) : (
            <ButtonLink link="results">Results</ButtonLink>
          )}
        </li>
      </ul>
      <progress
        max={quizzesList.length}
        value={currentQuizStep}
        className="h-4 w-full rounded bg-green-200 [&::-moz-progress-bar]:bg-green-600 [&::-webkit-progress-bar]:bg-yellow-200 [&::-webkit-progress-value]:bg-yellow-400"
      ></progress>
    </section>
  );
};

export default QuizCard;
