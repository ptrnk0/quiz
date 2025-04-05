import { FormEvent, useCallback, useEffect, useState } from "react";
import { IQuizPossibleAnswers, IQuizResponse } from "../../types/index.types";
import { useAppDispatch } from "../../hooks";
import { addAnswers, changeScore } from "../../redux/answersSlice";

interface IQuizFromProps {
  quiz: IQuizResponse;
  answers: IQuizPossibleAnswers[] | undefined;
}

const QuizForm = ({ quiz, answers }: IQuizFromProps) => {
  const dispatch = useAppDispatch();
  const [selectedCorrect, setSelectedCorrect] =
    useState<IQuizPossibleAnswers[]>();
  const [selectedWrong, setSelectedWrong] = useState<IQuizPossibleAnswers[]>();
  const [checked, setChecked] = useState(false);

  const checkAnswers = useCallback(
    (selectedAnswers: IQuizPossibleAnswers[]): number => {
      const correctAnswers = quiz.possibleAnswers.filter(
        (answer) => answer.isCorrect,
      );
      const wrongAnswers = quiz.possibleAnswers.filter(
        (answer) => !answer.isCorrect,
      );

      const selectedCorrectAnswers = selectedAnswers.filter((answer) =>
        correctAnswers.some((correct) => correct.id === answer.id),
      );
      const selectedWrongAnswers = selectedAnswers.filter((answer) =>
        wrongAnswers.some((wrong) => wrong.id === answer.id),
      );

      setSelectedCorrect(selectedCorrectAnswers);
      setSelectedWrong(selectedWrongAnswers);

      const totalCorrect = correctAnswers.length;
      const correctCount = selectedCorrectAnswers.length;
      const wrongCount = selectedWrongAnswers.length;

      const rawScore = correctCount - wrongCount * 0.5;
      const finalScore = Math.max(0, rawScore / totalCorrect);

      return finalScore;
    },
    [quiz.possibleAnswers],
  );

  useEffect(() => {
    if (answers) {
      setChecked(true);
      checkAnswers(answers);
    } else {
      setChecked(false);
      setSelectedCorrect(undefined);
      setSelectedWrong(undefined);
    }
  }, [answers, quiz, checkAnswers]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const selectedIds = formData.getAll("quiz");

    if (selectedIds.length === 0) {
      alert("Please select one or more answers!");
      return;
    }

    const parsedSelectedIds = selectedIds.map((id) => parseInt(id.toString()));
    const possibleAnswersForCurrentQuiz = quiz.possibleAnswers;

    const selectedAnswers = possibleAnswersForCurrentQuiz.filter((answer) =>
      parsedSelectedIds.includes(answer.id),
    );

    const score = checkAnswers(selectedAnswers);

    dispatch(
      addAnswers({
        quizId: quiz.id,
        selectedAnswers: selectedAnswers,
      }),
    );

    dispatch(changeScore(score));
  };

  const labelColor = (id: number) => {
    if (selectedCorrect?.some((answer) => answer.id === id)) {
      return { backgroundColor: "green" };
    } else if (selectedWrong?.some((answer) => answer.id === id)) {
      return { backgroundColor: "red" };
    }
    return {};
  };

  return (
    <form
      className="grid gap-2 md:grid-cols-2 md:gap-4"
      id="quiz-form"
      onSubmit={(event) => handleSubmit(event)}
    >
      {quiz.possibleAnswers.map(({ id, text }) => {
        return (
          <div key={id}>
            <input
              type={quiz.questionType === "multiple" ? "radio" : "checkbox"}
              id={`option-${id}`}
              name="quiz"
              className="peer hidden"
              defaultValue={id}
              disabled={checked}
            />
            <label
              htmlFor={`option-${id}`}
              className="text-md flex h-full cursor-pointer items-center justify-center border-2 border-black bg-yellow-400 px-3 py-1 text-center transition-colors duration-300 ease-in peer-checked:bg-yellow-600 hover:bg-yellow-500 md:text-xl"
              style={labelColor(id)}
            >
              {text}
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default QuizForm;
