import { Link } from "react-router-dom";
import "./MoviesLayout.css";
import { useEffect, useState } from "react";
import { getMovies } from "../../services/apiFacade";
// import { useAuth } from "../security/AuthProvider";

export default function movieList() {
  const [movies, setMovies] = useState<Array<APIMovie>>([]);
  const [error, setError] = useState("");
  //   const auth = useAuth();

  useEffect(() => {
    try {
      const movies = getMovies();
      setMovies(movies);
    } catch (error) {
      setError("Error loading movies, is the server running?");
    }
  }, []);

  const movieListItems = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <Link to={`${movie.id}`}>{movie.name}</Link>,
        {/* {auth.isLoggedIn() && ( */}
        {/* <Link className="movie-btn" to="/add" state={movie}>
          Edit{" "}
        </Link> */}
        {/* )} */}
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
