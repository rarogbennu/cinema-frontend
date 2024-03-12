import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cinema() {
  const { id } = useParams();

  const [recipe, setCinema] = useState<ApiCinema | null>(null);
  useEffect(() => {
    getCinema(Number(id)).then((res) => setCinema(res));
  }, [id]);

  return (
    <>
      {cinema ? (
        <>
          <h3>
            {" "}
            {cinema.name} ({cinema.id})
          </h3>
          <div>
            <ul>
              {/* navngiv evt til activeScreenings... */}
              {cinema.activeMovies.map((activeMovie) => (
                <li key={activeMovie}>{activeMovie}</li>
              ))}
            </ul>
          </div>
          <hr />{" "}
        </>
      ) : (
        <h2>Looking for cinema... Try refreshing page if it takes long</h2>
      )}
    </>
  );
}
