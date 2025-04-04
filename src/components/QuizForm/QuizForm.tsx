import { FormEvent } from "react";
import { IQuizResponse } from "../../types/index.types";

interface IQuizFromProps {
  quiz: IQuizResponse;
}

const QuizForm = ({ quiz }: IQuizFromProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const selectedAnswer = formData.getAll("quiz");

    if (!selectedAnswer) {
      alert("Пожалуйста, выберите вариант ответа!");
      return;
    }

    console.log("Выбранный ответ:", selectedAnswer);
  };

  return (
    <form
      className="grid gap-2 md:grid-cols-2 md:gap-4"
      id="quiz-form"
      onSubmit={(event) => handleSubmit(event)}
    >
      {quiz.possibleAnswers.map(({ id, text }) => (
        <div key={id}>
          <input
            type="radio"
            id={`option-${id}`}
            name="quiz"
            className="peer hidden"
            value={id}
          />
          <label
            htmlFor={`option-${id}`}
            className="text-md flex h-full cursor-pointer items-center justify-center border-2 border-black bg-yellow-400 px-3 py-1 text-center transition-colors duration-300 ease-in peer-checked:bg-yellow-600 hover:bg-yellow-500 md:text-xl"
          >
            {text}
          </label>
        </div>
      ))}
    </form>
  );
};

export default QuizForm;
