import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCinema, Cinema as ApiCinema } from "../../services/apiFacade";

export default function Cinema() {
  const { id } = useParams();

  const [cinema, setCinema] = useState<ApiCinema | null>(null);
  useEffect(() => {
    getCinema(Number(id)).then((res) => {
      console.log(res); // Log the data response here
      setCinema(res);
    });
  }, [id]);

  return (
    <div>
      {cinema ? (
        <div>
          <h3>{cinema.name}</h3>
          <p>{cinema.location}</p>
        </div>
      ) : (
        <h2>Sorry. Cinema not found</h2>
      )}
    </div>
  );
}


// get movies for cinema by screening id -> screen.id -> cinema.id
// show movie poster cards with titel and -> screeningcards with date and time
