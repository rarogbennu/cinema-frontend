import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCinema, Cinema as ApiCinema, Screening as ApiScreening, getScreeningsByCinemaId, getMovie, Movie } from "../../services/apiFacade";

export default function Cinema() {
  const { id } = useParams();

  const [cinema, setCinema] = useState<ApiCinema | null>(null);
  const [screenings, setScreenings] = useState<ApiScreening[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // Add state for movies

  useEffect(() => {
    getCinema(Number(id)).then((res) => {
      console.log(res);
      setCinema(res);
    });
  }, [id]);

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        if (cinema) {
          const screeningsResponse = await getScreeningsByCinemaId(cinema.id || 0);

          // Extract unique movie IDs from the screenings
          const movieIds = Array.from(new Set(screeningsResponse.map(screening => screening.movieId)));
          // Now fetch details of each movie using the unique movie IDs
          const moviesPromises = movieIds.map(movieId => getMovie(movieId));
          const moviesResponse = await Promise.all(moviesPromises);
          // Set the fetched movies in state
          setMovies(moviesResponse);

          setScreenings(screeningsResponse);
        }
      } catch (error) {
        console.error("Error fetching screenings:", error);
      }
    };

    //gotta test

    fetchScreenings();
  }, [cinema]);

  return (
    <>
      <h3>Cinema: {cinema?.name}</h3>
   
      <div className="board-container">
        <div className="movie-compartment">
          <h3>Movies</h3>
          <div className="movie-list">
            {movies.map(movie => (
              <div key={movie.id} className="movie-item">
                <h4>{movie.title}</h4>
                <img src={movie.poster} alt={movie.title} />
                <h5>Screenings:</h5>
                <ul>
                  {screenings
                    .filter(screening => screening.movieId === movie.id)
                    .map(screening => (
                      <Link key={screening.id} to={`/screenings/${screening.id}`}>
                        <button>{new Date(screening.date).toLocaleString()}</button>
                      </Link>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}