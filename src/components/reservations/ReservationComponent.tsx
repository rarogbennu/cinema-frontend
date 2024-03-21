import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScreening, getScreen, getSeatsByScreenId, getReservationsByScreeningId, getAllPriceCategories, Screening as ApiScreening, Screen as ApiScreen, Seat as ApiSeat, Reservation as ApiReservation, PriceCategory as ApiPriceCategory } from "../../services/apiFacade.ts";
import "./ReservationLayout.css";


export default function ReservationComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [screening, setScreening] = useState<ApiScreening | null>(null);
  const [screen, setScreen] = useState<ApiScreen | null>(null);
  const [seats, setSeats] = useState<ApiSeat[]>([]);
  const [reservations, setReservations] = useState<ApiReservation[]>([]);
  const [priceCategory, setPriceCategory] = useState<ApiPriceCategory[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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
        // console.log(reservationDetails);

        const priceCategoryDetails: ApiPriceCategory[] = await getAllPriceCategories();
        setPriceCategory(priceCategoryDetails);
        // console.log(priceCategoryDetails);

      } catch (error) {
        console.error("Error fetching screening and screen details:", error);
      }
    };

    fetchData();
  }, [id]);

  const isSeatReserved = (seatId: number) => {
      return reservations.some((reservation) => reservation.seatId === seatId);
  };

  const handleSeatClick = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    console.log(`Seat ${seatId} clicked`);
  };

  const handleReserveClick = () => {
    console.log("Selected Seats:", selectedSeats);
    // Navigate to TotalReservationComponent with selectedSeats as a query parameter
    navigate(`/total-reservations?selectedSeats=${selectedSeats.join(',')}`);
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seats.find(seat => seat.id === seatId);
    const seatPriceCategory = priceCategory.find(category => category.id === seat?.priceCategoryId);
    const price = seatPriceCategory ? seatPriceCategory.price : 0; // Assuming default price is 0 if category not found
    return total + price;
  }, 0);

  return (
    <>
    <div className="board-container">
      <div className="board-screen">
      <h3>Screening Details</h3>
      {screening && <p>Date: {screening.date}</p>}
      {screen && <p>Screen: {screen.name}</p>}
      {screen && <p>Rows: {screen.rows}</p>}
      {screen && <p>Capacity: {screen.capacity}</p>}

      <div className="screen"><p>Screen</p></div>
      {screen && (
        <div className="seats-grid" style={{ gridTemplateColumns: `repeat(${Math.ceil(screen.capacity / screen.rows)}, 1fr)` }}>
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${isSeatReserved(seat.id) ? 'reserved' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
              onClick={isSeatReserved(seat.id) ? undefined : () => handleSeatClick(seat.id)}
              style={{ cursor: isSeatReserved(seat.id) ? 'default' : 'pointer' }}
            >
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="board-reservation">
        <h3>Reservation Details</h3>
        <p>Selected Seats:</p>
        <ul>
          {selectedSeats.map((seatId, index) => {
            const seat = seats.find(seat => seat.id === seatId);
            const seatPriceCategory = priceCategory.find(category => category.id === seat?.priceCategoryId);
            const price = seatPriceCategory ? seatPriceCategory.price : 0;
            return (
              <li key={index}>
                Seat {seatId} - Price: {price}
              </li>
            );
          })}
        </ul>
        <p>Total Price: {totalPrice}</p>
          <Link to={`/total-reservations?selectedSeats=${selectedSeats.join(',')}`}>
            <button className="reservation-button" onClick={handleReserveClick}>Reserve</button>
          </Link>
      </div>
    </div>  
    </>
  );
}

// test