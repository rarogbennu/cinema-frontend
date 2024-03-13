import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCinemas, Cinema } from "../../services/apiFacade";

export default function CinemaList() {
  const [cinemas, setCinemas] = useState<Cinema[] | null>(null);

  useEffect(() => {
    getAllCinemas(null).then((res) => setCinemas(res));
  }, []);

  return (
    <>
      <h3>Cinemas</h3>
      <div>
        <div>• Click on a cinema to see details •</div>
        {cinemas ? (
          <ul>
            {cinemas.map((cinema) => (
              <li key={cinema.id}>
                <Link to={`/cinemas/${cinema.id}`}>
                  {cinema.name}, {cinema.location}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Looking for cinemas... Try refreshing page if it takes long</h2>
        )}
      </div>
    </>
  );
}
