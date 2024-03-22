import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../security/AuthProvider";
import { createReservation } from "../../services/apiFacade";

export default function TotalReservationComponent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSeats = queryParams.get("selectedSeats");
  const screeningId = queryParams.get("screeningId");
  const { username } = useAuth();

  const [email, setEmail] = useState("");
  const [reservationStatus, setReservationStatus] = useState(""); // State variable for reservation status

  // @ts-ignore
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleConfirmReservation = async () => {
    try {
      // Convert selectedSeats string to an array of seat IDs
      // @ts-ignore
      const selectedSeatIds = selectedSeats.split(',').map(seatId => Number(seatId));
  
      // Create an array to collect all reservation objects
      const reservations = [];
  
      // Iterate over each selected seat to create a reservation object
      for (const seatId of selectedSeatIds) {
        const reservation = {
          screeningId: Number(screeningId),
          seatId: seatId,
          totalReservationId: 0, // Set appropriate totalReservationId if needed
          dummyUser: username ? username : email, // Use user's username if logged in, otherwise use email
          created: new Date().toISOString(), // Set created date to current date and time
        };
        console.log("Reservation Object:", reservation);
        reservations.push(reservation); // Collect the reservation object in the array
      }
  
      // Make API call to create reservations with reservation data
      await createReservation(reservations);
  
      setReservationStatus("Reservation successful!");
    } catch (error) {
      console.error("Error creating reservations:", error);
      setReservationStatus("Error creating reservations");
    }
  };
  
  // Placeholder content, replace with your actual implementation
  return (
    <>
      <h2>Total Reservations</h2>
      <div>
        <h3>Screening info</h3>
        {/* Display screening info here using screeningId */}
        <p>Screening ID: {screeningId}</p>
      </div>
      <div>
        <h3>Selected Seats Overview</h3>
        <ul>
          <p>{selectedSeats}</p>
        </ul>
      </div>
      <div>
        <h3>Confirm or Decline</h3>
        {username ? (
          // If user is logged in, display confirm button
          <button onClick={handleConfirmReservation}>Confirm</button>
        ) : (
          // If user is not logged in, display email input field
          <form onSubmit={handleConfirmReservation}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </label>
            <button type="submit">Confirm</button>
          </form>
        )}
        {/* Display reservation status */}
        {reservationStatus && <p>{reservationStatus}</p>}
        <button>Decline</button>
      </div>
    </>
  );
}

//tets
