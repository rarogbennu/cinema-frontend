import React, { useState, useEffect } from "react";
import { getAllCinemas, Cinema, getMovie } from "../../services/apiFacade";
import { Movie } from "../../services/apiFacade";
import {
  getScreeningsByCinemaId,
  Screening as APIScreening,
} from "../../services/apiFacade";
import "../admin/adminScreenings.css";
import { Link } from "react-router-dom";

function AdminScreenings() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [screenings, setScreenings] = useState<APIScreening[]>([]);
  const [error, setError] = useState<string>("");
  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const cinemas = await getAllCinemas();
        setCinemas(cinemas);
      } catch (error) {
        setError("Error loading cinemas, is the server running?");
      }
    };

    fetchCinemas();
  }, []);

  const fetchScreeningsByCinemaId = async (cinemaId: number) => {
    try {
      const screeningsResponse = await getScreeningsByCinemaId(cinemaId);

      const movieIds = Array.from(
        new Set(screeningsResponse.map((screening) => screening.movieId))
      );
      const moviesPromises = movieIds.map((movieId) => getMovie(movieId));
      const moviesResponse = await Promise.all(moviesPromises);

      setMovies(moviesResponse);
      setScreenings(screeningsResponse);
    } catch (error) {
      console.error("Error fetching screenings:", error);
      setError("Error loading screenings, is the server running?");
    }
  };

  const handleCinemaChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cinemaId = parseInt(event.target.value, 10);
    setSelectedCinema(cinemaId);
    await fetchScreeningsByCinemaId(cinemaId);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>
        Vælg bio <br />
      </h2>
      <select value={selectedCinema} onChange={handleCinemaChange}>
        <option value="">Vælg biograf</option>
        {cinemas.map(
          (cinema) =>
            // Tilføj kun <option>-elementer, hvis cinema.id ikke er null
            cinema.id !== null && (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            )
        )}
      </select>
      {selectedCinema && (
        <>
          <h2>Aktuelle film</h2>
          <div className="admin-movies-container">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>Screenings</p>
                <div className="screenings-container">
                  <ul>
                    {screenings
                      .filter((screening) => screening.movieId === movie.id)
                      .map((screening) => (
                        <Link
                          key={screening.id}
                          to={`/editScreening/${screening.id}`}
                        >
                          <button>
                            {new Date(screening.date).toLocaleString(
                              "da-dk",
                              timeFormatOptions
                            )}
                          </button>
                        </Link>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminScreenings;
