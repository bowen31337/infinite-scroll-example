import { useEffect, useState } from "react";
import { Movie } from ".";

export const useMovie = (movieId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [movie, setMovie] = useState<Partial<Movie>>({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}?i=${movieId}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        const data: Movie = await res.json();
        const { Response, Error: errorMsg , ...others} = data;
        if (Response !== "True") {
          throw new Error(errorMsg);
        }
        setMovie(others);
      } catch (e: unknown) {
        setErrorMsg((e as Error)?.message);
        setMovie({});
      } finally {
        setIsLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    errorMsg,
    isLoading,
    movie,
  };
};
