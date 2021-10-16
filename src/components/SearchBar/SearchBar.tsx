/* eslint-disable react-hooks/exhaustive-deps */
import React, { LegacyRef } from "react";
import { Link } from "react-router-dom";
import { useSearchBar, useOnScreen, SearchItem } from "./";
import {uniqBy} from '../../utils'
import "./SearchBar.styles.css";

const MIN_NUM_CHAR = 4;

const SearchBar = () => {
  const { search, isLoading, errorMsg, results, page, setPage, setErrorMsg } =
    useSearchBar();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [validInput, setValidInput] = React.useState<boolean>(true);
  const loaderRef = React.useRef<Element | undefined>();
  const [data, setData] = React.useState<SearchItem[]>([]);

  const isVisible = useOnScreen(loaderRef);

  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault();
   
    if(validInput) {
      setData([]);
      search(inputValue, 1);
    } 
  };

  React.useEffect(() => {
    if (!validInput) return;
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
        <label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target?.value);
              setValidInput(e.target?.value.length >= MIN_NUM_CHAR);
              setErrorMsg('')
            }}
            value={inputValue}
            placeholder="Search Movie Name"
            className="searchTerm"
          />
          {!validInput && (
            <p className="warning">
              Please type minimum {MIN_NUM_CHAR} characters and strike enter key!
            </p>
          )}
        </label>
        <button type="submit" className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <section className="results">
        <ul>
          {uniqBy<SearchItem>(data, item => item.imdbID).map((result) => (
            <li key={result.imdbID}>
              <Link to={`/movie/${result.imdbID}`}>
                <article>
                  <figure>
                    <img
                      alt={result.Title}
                      src={
                        result.Poster === "N/A"
                          ? "https://omdb.mathub.io/img/logo-omdb.png"
                          : result.Poster
                      }
                    />
                  </figure>
                  <section>
                    <h4>{result.Title}</h4>
                    <p>{[result.Year, result.Type].join(" ")}</p>
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
            <i className="far fa-sad-cry"></i>{" "}
            <i className="far fa-sad-cry"></i>{" "}
            <i className="far fa-sad-cry"></i>
            {errorMsg}
          </p>
        )}
      </section>
    </>
  );
};

export default SearchBar;