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
        <p><b>Type</b>: {movie.Type}</p>
        <p><b>Year</b>: {movie.Year}</p>
        <p><b>Released</b>: {movie.Released}</p>
        {movie.DVD && <p><b>DVD</b>: {movie.DVD}</p>}
        <p><b>Actors</b>: {movie.Actors}</p>
        {movie.Director !=='N/A' && <p><b>Director</b>: {movie.Director}</p>}
        <p><b>Genre</b>: {movie.Genre}</p>
        {movie.Awards !== "N/A" && <p><b>Awards</b>: {movie.Awards}</p>}
        {movie.BoxOffice && <p><b>BoxOffice</b>: {movie.BoxOffice}</p>}
        <p><b>Country</b>: {movie.Country}</p>
        <p><b>Language</b>: {movie.Language}</p>
      </section>
    </article>
  );
};

export default OmdbMovie;
