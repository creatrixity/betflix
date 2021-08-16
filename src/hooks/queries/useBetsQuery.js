import { useQuery } from "react-query";

function normalizeBets(betsList) {
  return betsList.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.fixture_id]: curr,
    }),
    {}
  );
}

const getBets = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (response.ok) {
    return normalizeBets(data.results);
  }

  return Promise.reject(new Error(data.message));
};

export default function useBetsQuery() {
  return useQuery("bets", () => getBets("/.netlify/functions/fetchBets"));
}
