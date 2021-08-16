import { useMutation } from "react-query";

const ENDPOINT = "/.netlify/functions/placeBet";

export default function usePlaceBetMutation() {
  const request = async (payload) => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) return Promise.reject(new Error(data.message));

    return data;
  };
  const { mutate, ...mutationState } = useMutation(request);

  return [mutate, mutationState];
}
