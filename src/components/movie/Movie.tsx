import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../../services/apiFacade";
import { getMovie } from "../../services/apiFacade";

export default function Movie() {
  const { imdbID } = useParams<{ imdbID }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await getMovie(imdbID);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Poster}</p>
      {/* Add more details here */}
    </div>
  );
}
