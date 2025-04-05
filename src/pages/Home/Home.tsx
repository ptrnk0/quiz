import { Link } from "react-router-dom";
import InfiniteScrollText from "../../components/InfiniteScrollText/InfiniteScrollText";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetAnswers } from "../../redux/answersSlice";

const Home = () => {
  const firstQuiz = useAppSelector((state) => state.questions.items[0]);
  const answers = useAppSelector((state) => state.answers.items);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetAnswers());
  };

  return (
    <main className="relative m-auto flex h-full w-11/12 grow-1 flex-col">
      <section className="relative mb-10">
        <InfiniteScrollText
          text="test your HTML skills"
          speed={10}
          className="z-1 border-2 border-black bg-pink-100"
        />
        <div className="absolute -right-1 -bottom-1 h-full w-full border-2 border-black bg-pink-100"></div>
      </section>

      <section className="relative grow-1">
        <div className="absolute -right-1 -bottom-1 h-full w-full border-2 border-black bg-pink-100"></div>

        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-10 border-2 border-black bg-pink-100 p-4">
          <h1 className="text-center text-2xl font-semibold text-pretty uppercase">
            Think you&#39;ve mastered the building blocks of the web? <br />
            Put your knowledge to the test with our interactive HTML quiz!
          </h1>
          <Link
            to={`/${firstQuiz?.sys.id}`}
            className="cursor-pointer border-2 border-black bg-yellow-400 px-3 py-1 text-xl transition-colors duration-300 ease-in hover:bg-yellow-500"
          >
            Ready, set, code!
          </Link>
          {answers.length > 0 && (
            <button
              type="button"
              className="cursor-pointer uppercase underline"
              onClick={handleClick}
            >
              Reset answers!
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
