import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCinema, Cinema as ApiCinema, Screening as ApiScreening, getScreeningsByCinemaId } from "../../services/apiFacade";

export default function Cinema() {
  const { id } = useParams();

  const [cinema, setCinema] = useState<ApiCinema | null>(null);
  const [screenings, setScreenings] = useState<ApiScreening[]>([]);
  
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
          // Fetch screenings associated with the cinema
          const screeningsResponse = await getScreeningsByCinemaId(cinema.id || 0);
          setScreenings(screeningsResponse);
        }
      } catch (error) {
        console.error("Error fetching screenings:", error);
      }
    };

    fetchScreenings();
  }, [cinema]);

  return (
    <>
      <h3>Cinema: {cinema?.name}</h3>
   
      <div className="board-container">
        <div className="movie-compartment">
          <h3>Movie Title</h3>
          <img src="https://via.placeholder.com/150" alt="Movie Poster" />
        </div>
        <div className="screenings-compartment">
          <h3>Screenings</h3>
          <ul>
            {screenings.map((screening) => (
              <li key={screening.id}>{screening.id}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}


// get movies for cinema by screening id -> screen.id -> cinema.id
// show movie poster cards with titel and -> screeningcards with date and time
