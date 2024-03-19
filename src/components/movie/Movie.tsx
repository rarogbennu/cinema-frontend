import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../../services/apiFacade";
import { getMovie } from "../../services/apiFacade";

export default function Movie() {
  const { id } = useParams<{ id: number }>();
  console.log("id", id);

  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    getMovie(id || 0).then((res) => {
      console.log("movie data", res);
      setMovie(res);
    });
  }, [id]);

  console.log("movie", movie);

  return (
    <>
      {movie ? (
        <>
          <h3> Titel: {movie.title}</h3>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: 200, margin: 10, flexDirection: "column" }}
              src={movie.poster}
              alt={movie.title}
            />
            <p style={{ display: "inline", flexDirection: "column" }}>
              <strong>Director:</strong> {movie.director}<br />
              <strong>Genre:</strong> {movie.genre}<br />
              <strong>Released:</strong> {movie.released}<br />
              <strong>Runtime:</strong> {movie.runtime}<br />
              <strong>IMDb Rating:</strong> {movie.imdbRating}<br />
              <strong>IMDb Votes:</strong> {movie.imdbVotes}<br />
            </p>
          </div>
          <hr />
          
        </>
      ) : (
        <h2>Sorry. Movie not found</h2>
      )}
    </>
  );
}
