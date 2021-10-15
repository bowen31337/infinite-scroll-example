import { useParams } from "react-router-dom";
import { useMovie } from ".";
import "./Movie.styles.css";

const OmdbMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { isLoading, errorMsg, movie } = useMovie(movieId);

  if (isLoading) {
    return (
      <div className="spinner">
        <i className="fa fa-spinner"></i>
      </div>
    );
  }

  if (errorMsg !== "") {
    return (
      <p className="error">
        <i className="far fa-sad-cry"></i> <i className="far fa-sad-cry"></i>{" "}
        <i className="far fa-sad-cry"></i>
        {errorMsg}
      </p>
    );
  }

  if (Object.keys(movie).length === 0) {
    return null;
  }

  return (
    <article className="movie">
      <figure>
        <img
          alt={movie.Title}
          src={
            movie.Poster === "N/A"
              ? "https://omdb.mathub.io/img/logo-omdb.png"
              : movie.Poster
          }
        />
      </figure>
      <section>
        <h2>{movie.Title}</h2>
        <h3>{movie.Plot}</h3>
        <p>Type: {movie.Type}</p>
        <p>Year: {movie.Year}</p>
        <p>Released: {movie.Released}</p>
        <p>DVD: {movie.DVD}</p>
        <p>Actors: {movie.Actors}</p>
        <p>Director: {movie.Director}</p>
        <p>Genre: {movie.Genre}</p>
        {movie.Awards !== "N/A" && <p>Awards: {movie.Awards}</p>}
        <p>BoxOffice: {movie.BoxOffice}</p>
        <p>Country: {movie.Country}</p>
        <p>Language: {movie.Language}</p>
      </section>
    </article>
  );
};

export default OmdbMovie;
