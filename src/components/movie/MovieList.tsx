import { Link } from "react-router-dom";
import "./MoviesLayout.css";
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
      // @ts-ignore
      return (
        <li key={movie.id}>
          <Link to={`${movie.id}`}>{movie.Title}</Link>
          <p>{movie.Director}</p>
        </li>
      );
    });

    if (error !== "") {
      return <h2 style={{ color: "red" }}>{error}</h2>;
    }
    return (
      <>
        <h3>Movies</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>{movieListItems}</ul>
      </>
    );
}
