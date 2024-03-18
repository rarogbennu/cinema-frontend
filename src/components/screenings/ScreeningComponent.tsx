import { useEffect, useState } from "react";
import { getAllScreenings, Screening as APIScreening } from "../../services/apiFacade";
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
      <div className="screenings-container"> {/* Use a container for the screenings */}
        {screenings.map((screening) => (
          <div key={screening.id} className="screening-card"> {/* Use div for each card */}
            <p>{screening.screenId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}