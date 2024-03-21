// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ReservationComponent from "../reservations/ReservationComponent";
// import TotalReservationComponent from "../totalReservations/TotalReservationComponent";
// import {
//   getScreening,
//   getScreen,
//   getSeatsByScreenId,
//   getReservationsByScreeningId,
//   getAllPriceCategories,
//   Screening as ApiScreening,
//   Screen as ApiScreen,
//   Seat as ApiSeat,
//   Reservation as ApiReservation,
//   PriceCategory as ApiPriceCategory
// } from "../../services/apiFacade.ts";

// export default function ParentComponent() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [screening, setScreening] = useState<ApiScreening | null>(null);
//   const [screen, setScreen] = useState<ApiScreen | null>(null);
//   const [seats, setSeats] = useState<ApiSeat[]>([]);
//   const [reservations, setReservations] = useState<ApiReservation[]>([]);
//   const [priceCategory, setPriceCategory] = useState<ApiPriceCategory[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const screeningDetails: ApiScreening = await getScreening(Number(id));
//         setScreening(screeningDetails);

//         const screenDetails: ApiScreen = await getScreen(screeningDetails.screenId);
//         setScreen(screenDetails);

//         const seatDetails: ApiSeat[] = await getSeatsByScreenId(screenDetails.id);
//         setSeats(seatDetails);

//         const reservationDetails: ApiReservation[] = await getReservationsByScreeningId(screeningDetails.id);
//         setReservations(reservationDetails);

//         const priceCategoryDetails: ApiPriceCategory[] = await getAllPriceCategories();
//         setPriceCategory(priceCategoryDetails);
//       } catch (error) {
//         console.error("Error fetching screening and screen details:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <>
//       <ReservationComponent
//         screening={screening}
//         screen={screen}
//         seats={seats}
//         reservations={reservations}
//         priceCategory={priceCategory}
//         selectedSeats={selectedSeats}
//         setSelectedSeats={setSelectedSeats}
//         navigate={navigate}
//       />
//       <TotalReservationComponent
//         selectedSeats={selectedSeats}
//         navigate={navigate}
//       />
//     </>
//   );
// }
