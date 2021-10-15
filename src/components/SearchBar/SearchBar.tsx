/* eslint-disable react-hooks/exhaustive-deps */
import React, { LegacyRef } from "react";
import { Link } from "react-router-dom";
import { useSearchBar, useOnScreen, SearchItem } from "./";
import "./SearchBar.styles.css";

const SearchBar = () => {
  const { search, isLoading, errorMsg, results, page, setPage } =
    useSearchBar();
  const [inputValue, setInputValue] = React.useState<string>("");
  const loaderRef = React.useRef<Element | undefined>();
  const [data, setData] = React.useState<SearchItem[]>([]);


  const isVisible = useOnScreen(loaderRef);

  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault();
    search(inputValue, 1);
  };

  React.useEffect(() => {
    console.log({ isLoading, isVisible });
    if (inputValue.length < 4) return;
    if (results.length === 0) return;
    if (isVisible && !isLoading) {
      setPage((pre) => pre + 1);
    }
  }, [isVisible, isLoading]);

  React.useEffect(() => {
    if (page > 1) {
      search(inputValue, page);
    }
  }, [page]);

  React.useEffect(() => {
    if (results.length > 0) {
      setData((pre) => [...pre, ...results]);
    }
  }, [results]);

  return (
    <>
      <form className="search" onSubmit={searchMovie}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target?.value);
          }}
          value={inputValue}
          placeholder="Search Movie Name"
          className="searchTerm"
        />
        <button type="submit" className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <section className="results">
        <ul>
          {data.map((result) => (
            <li key={result.imdbID}>
              <Link to={`/movie/${result.imdbID}`}>
              <article>
                <figure><img alt={result.Title} src={result.Poster === "N/A" ? 'https://omdb.mathub.io/img/logo-omdb.png': result.Poster} /></figure>
                <section>
                  <h4>
                  {result.Title}
                  </h4>
                  <p>{[result.Year, result.Type].join(' ')}</p>
                </section>
              </article>
              </Link>
              </li>
          ))}
        </ul>

        <div
          className="spinner"
          ref={loaderRef as LegacyRef<HTMLDivElement> | undefined}
        >
          {isLoading && <i className="fa fa-spinner"></i>}
        </div>
        {errorMsg !== "" && (
          <p className="error">
            <i className="far fa-sad-cry"></i> <i className="far fa-sad-cry"></i> <i className="far fa-sad-cry"></i>
            {errorMsg}
          </p>
        )}
      </section>
    </>
  );
};

export default SearchBar;
