
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScreening, getScreen, getSeatsByScreenId, Screening as ApiScreening, Screen as ApiScreen, Seat as ApiSeat } from "../../services/apiFacade.ts";
import "./ReservationLayout.css";

export default function ReservationComponent() {
  const { id } = useParams();

  const [screening, setScreening] = useState<ApiScreening | null>(null);
  const [screen, setScreen] = useState<ApiScreen | null>(null);
  const [seats, setSeats] = useState<ApiSeat[]>([]);

  useEffect(() => {
    const fetchScreeningAndScreen = async () => {
      try {
        const screeningDetails: ApiScreening = await getScreening(Number(id));
        setScreening(screeningDetails);

        const screenDetails: ApiScreen = await getScreen(screeningDetails.screenId);
        setScreen(screenDetails);

        const seatDetails: ApiSeat[] = await getSeatsByScreenId(screenDetails.id);
        setSeats(seatDetails);
      } catch (error) {
        console.error("Error fetching screening and screen details:", error);
      }
    };

    fetchScreeningAndScreen();
  }, [id]);

  return (
    <>
      <h3>Screening Details</h3>
      {screening && <p>Date: {screening.date}</p>}
      {screen && <p>Screen: {screen.name}</p>}
      {screen && <p>Rows: {screen.rows}</p>}
      {screen && <p>Capacity: {screen.capacity}</p>}
      <h3>Seats</h3>
      <div className="screen"><p>Screen</p></div>
      {screen && (
        <div className="seats-grid" style={{ gridTemplateColumns: `repeat(${Math.ceil(screen.capacity / screen.rows)}, 1fr)` }}>
          {seats.map((seat) => (
            <div key={seat.id} className="seat">
              <p>Seat</p>{seat.id}
            </div>
          ))}
        </div>
      )}
    </>
  );
  
}