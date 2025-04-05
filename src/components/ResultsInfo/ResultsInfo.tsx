import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import ButtonLink from "../ButtonLink/ButtonLink";
import { fetchResultByScore } from "../../utils/algoliaFetch";

const ResultsInfo = () => {
  const score = useAppSelector((state) => state.answers.score);
  const questions = useAppSelector((state) => state.questions.items);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    fetchResultByScore(Math.ceil(score)).then((res) => setResult(res));
  }, [score]);

  return (
    <section className="absolute top-1/2 left-1/2 z-10 flex w-11/12 max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border-2 border-black bg-pink-100 p-8 shadow-lg lg:h-auto">
      <p className="mb-6 text-center text-2xl font-semibold">
        <span className="uppercase">Your score: </span>
        {Math.ceil(score)} / {questions.length}
      </p>

      {result && (
        <div className="w-full space-y-4 text-center">
          <h1 className="text-3xl font-bold text-yellow-500">{result.title}</h1>
          <p className="text-lg">{result.description}</p>

          {result.resources?.length > 0 && (
            <div className="mt-4 text-left">
              <p className="font-bold text-yellow-500 uppercase">
                Recommended for you:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {result.resources.map((res, index) => (
                  <li key={index} className="text-sm">
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <ButtonLink link="">Go to home</ButtonLink>
      </div>
    </section>
  );
};

export default ResultsInfo;
