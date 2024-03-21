
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScreening, getScreen, getSeatsByScreenId, getReservationsByScreeningId, Screening as ApiScreening, Screen as ApiScreen, Seat as ApiSeat, Reservation as ApiReservation } from "../../services/apiFacade.ts";
import "./ReservationLayout.css";

export default function ReservationComponent() {
  const { id } = useParams();

  const [screening, setScreening] = useState<ApiScreening | null>(null);
  const [screen, setScreen] = useState<ApiScreen | null>(null);
  const [seats, setSeats] = useState<ApiSeat[]>([]);
  const [reservations, setReservations] = useState<ApiReservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const screeningDetails: ApiScreening = await getScreening(Number(id));
        setScreening(screeningDetails);

        const screenDetails: ApiScreen = await getScreen(screeningDetails.screenId);
        setScreen(screenDetails);

        const seatDetails: ApiSeat[] = await getSeatsByScreenId(screenDetails.id);
        setSeats(seatDetails);

        const reservationDetails: ApiReservation[] = await getReservationsByScreeningId(screeningDetails.id);
        setReservations(reservationDetails);
        console.log(reservationDetails);

      } catch (error) {
        console.error("Error fetching screening and screen details:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <h3>Screening Details</h3>
      {screening && <p>Date: {screening.date}</p>}
      {screen && <p>Screen: {screen.name}</p>}
      {screen && <p>Rows: {screen.rows}</p>}
      {screen && <p>Capacity: {screen.capacity}</p>}

      <h3>Reservations</h3>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Reservation ID: {reservation.id}</p>
            <p>Seat ID: {reservation.seatId}</p>
            <p>Customer Name: {reservation.dummyUser}</p>
          </li>
        ))}

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