import { useEffect, useState } from "react";
import { getAllScreenings, getMovie, Screening as APIScreening } from "../../services/apiFacade";
import "./ScreeningLayout.css";

export default function ScreeningsComponent() {
  const [screenings, setScreenings] = useState<Array<APIScreening>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScreenings = async () => { 
      try {
        const screenings = await getAllScreenings(); 
        setScreenings(screenings);
      } catch (error) {
        setError("Error loading screenings, is the server running?");
      }
    };

    fetchScreenings();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Screenings</h2>
      <div className="screenings-container">
        {screenings.map((screening) => (
          <div key={screening.id} className="screening-card">
            <p>Screen ID: {screening.screenId}</p>
            <p>Movie ID: {screening.movieId}</p> {/* Add movie ID */}
            <MovieDetails movieId={screening.movieId} /> {/* Pass movie ID to MovieDetails component */}
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetails({ movieId }: { movieId: number }) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getMovie(movieId);
        setMovie(movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {movie ? (
        <div>
          <h3>Movie: {movie.Title}</h3>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}
