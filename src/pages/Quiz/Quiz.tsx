import { useParams } from "react-router-dom";
import QuizCard from "../../components/QuizCard/QuizCard";

const Quiz = () => {
  const { quizId } = useParams();

  return (
    <main className="relative m-auto flex h-full w-11/12 grow-1 flex-col">
      <QuizCard quizId={quizId} />
      <div className="absolute top-1/2 left-1/2 h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 rotate-1 transform border-2 border-black bg-pink-100 lg:w-200"></div>
      <div className="absolute top-1/2 left-1/2 h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 rotate-2 transform border-2 border-black bg-pink-100 lg:w-200"></div>
      <div className="absolute top-1/2 left-1/2 h-3/4 w-10/12 grow-1 -translate-x-1/2 -translate-y-1/2 -rotate-2 transform border-2 border-black bg-pink-100 lg:w-200"></div>
    </main>
  );
};

export default Quiz;
