import { Link } from "react-router-dom";
import "./movieLayout.css";
import "./movieList.css";
import { useEffect, useState } from "react";
import { getAllMovies, Movie as APIMovie } from "../../services/apiFacade";

export default function MovieList() {
  const [movies, setMovies] = useState<Array<APIMovie>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getAllMovies();
        setMovies(movies);
      } catch (error) {
        setError("Error loading movies, is the server running?");
      }
    };

    fetchMovies();
  }, []);

  const movieListItems = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <Link to={`${movie.id}`}>
          <img className="movie-poster-on-list" src={movie.Poster} alt="" />
          <br />
          {movie.Title}
        </Link>
      </li>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }
  return (
    <>
      <ul style={{ listStyle: "none", paddingTop: "1em" }}>{movieListItems}</ul>
    </>
  );
}
