import { useAppSelector } from "../../hooks";
import ButtonLink from "../ButtonLink/ButtonLink";

const ResultsInfo = () => {
  const score = useAppSelector((state) => state.answers.score);
  const questions = useAppSelector((state) => state.questions.items);
  return (
    <section className="absolute top-1/2 left-1/2 z-1 m-auto flex h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 flex-col justify-center border-2 border-black bg-pink-100 px-5 py-10 lg:h-1/2 lg:w-200">
      <span className="uppercase">Your score:</span>
      {score} / {questions.length}
      <ButtonLink link="">Go to home</ButtonLink>
    </section>
  );
};

export default ResultsInfo;
