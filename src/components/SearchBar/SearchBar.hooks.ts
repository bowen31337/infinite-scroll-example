import React, { useEffect, useState } from "react";
import { SearchResponse } from ".";
import { SearchItem } from "./SearchBar.types";

export const useSearchBar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const search = async (value: string, page: number = 1) => {
    setIsLoading(true);
    setErrorMsg('')

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}?s=${value}&apikey=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      const data: SearchResponse = await res.json();
      const { Response, Search, Error: errorMsg } = data;
      if (Response !== "True") {
        throw new Error(errorMsg);
      }
      setResults(Search);
    } catch (e: unknown) {
      setErrorMsg((e as Error)?.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMsg,
    isLoading,
    search,
    searchValue,
    setSearchValue,
    results,
    page,
    setPage,
  };
};

export const useOnScreen = (
  ref: React.MutableRefObject<Element | undefined>
) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
};
