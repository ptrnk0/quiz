import { resultsIndex } from "../lib/algolia";

export const fetchResultByScore = async (score: number) => {
  const res = await resultsIndex.search("", {
    filters: `scoreRange:${score}`,
    hitsPerPage: 1,
  });

  return res.hits[0];
};
