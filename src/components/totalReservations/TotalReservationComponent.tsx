import { useLocation } from "react-router-dom";

export default function TotalReservationComponent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSeats = queryParams.get("selectedSeats");

  console.log("Selected Seats:", selectedSeats);

  // Placeholder content, replace with your actual implementation
  return (
    <>
      <h2>Total Reservations</h2>
      <div>
        <h3>Selected Seats Overview</h3>
        <ul>
          {(selectedSeats ?? "").split(",").map((seat, index) => (
            <li key={index}>Seat {seat}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Confirm or Decline</h3>
        <button>Confirm</button>
        <button>Decline</button>
      </div>
    </>
  );
}
