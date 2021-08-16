import { useQuery } from "react-query";

const getFixtures = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  return data;
};

export default function useFixturesQuery() {
  return useQuery("fixtures", () =>
    getFixtures("/.netlify/functions/fetchFixtures")
  );
}
