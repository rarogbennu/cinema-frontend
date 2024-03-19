import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const CINEMA_URL = API_URL + "/cinemas";
const SCREEN_URL = API_URL + "/screens";
const SEAT_URL = API_URL + "/seats";
const SCREENING_URL = API_URL + "/screenings";
const MOVIE_URL = API_URL + "/movies";
const RESERVATION_URL = API_URL + "/reservations";
const BOOKING_URL = API_URL + "/bookings";


interface Cinema {
  id: number | null;
  name: string;
  location: string;
  screens: string;
}

interface Screen {
  id: number;
  name: string;
  capacity: number;
  rows: number;
  created?: string;
  edited?: string;
}

interface Seat {
  id: number;
  screenId: number;
  priceCategoryId: number;
}

interface Screening {
  id: number;
  movieId: number;
  screenId: number;
  date: string;
  is3D: boolean;
}

interface Movie {
  id: number;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Rating[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
  response: string;
}

interface Rating {
  source: string;
  value: string;
}

interface Reservation {
  id: number;
  screeningId: number;
  seatId: number;
  bookingId: number;
  dummyUser: string;
  created?: string;
  edited?: string;
}

interface Booking {
  id: number;
  created?: string;
  edited?: string;
}

let cinema: Cinema[] = [];
let screen: Screen[] = [];
let seat: Seat[] = [];
let screening: Screening[] = [];
let movie: Movie[] = [];
let reservation: Reservation[] = [];
let booking: Booking[] = [];

// Get Cinemas
async function getAllCinemas(): Promise<Cinema[]> {
  if (cinema.length > 0) return [...cinema];
  const res = await fetch(CINEMA_URL).then(handleHttpErrors);
  cinema = [...res];
  return cinema;
}

async function getCinema(id: number): Promise<Cinema> {
  return fetch(CINEMA_URL + "/" + id).then(handleHttpErrors);
}

// Get Screens
async function getAllScreens(): Promise<Screen[]> {
  if (screen.length > 0) return [...screen];
  const res = await fetch(SCREEN_URL).then(handleHttpErrors);
  screen = [...res];
  return screen;
}

async function getScreen(id: number): Promise<Screen> {
  return fetch(SCREEN_URL + "/" + id).then(handleHttpErrors);
}

// Get All Seats
async function getAllSeats(): Promise<Seat[]> {
  if (seat.length > 0) return [...seat];
  const res = await fetch(SEAT_URL).then(handleHttpErrors);
  seat = [...res];
  return seat;
}

async function getSeat(id: number): Promise<Seat> {
  return fetch(SEAT_URL + "/" + id).then(handleHttpErrors);
}

// Get All Screenings
async function getAllScreenings(): Promise<Screening[]> {
  if (screening.length > 0) return [...screening];
  const res = await fetch(SCREENING_URL).then(handleHttpErrors);
  screening = [...res];
  return screening;
}

async function getScreening(id: number): Promise<Screening> {
  return fetch(SCREENING_URL + "/" + id).then(handleHttpErrors);
}

// Get Screenings By Cinema ID
async function getScreeningsByCinemaId(cinemaId: number): Promise<Screening[]> {
  const res = await fetch(`${SCREENING_URL}/cinema/${cinemaId}`).then(handleHttpErrors);
  return res;
}

// Get Reservations
async function getAllReservations(): Promise<Reservation[]> {
  if (reservation.length > 0) return [...reservation];
  const res = await fetch(RESERVATION_URL).then(handleHttpErrors);
  reservation = [...res];
  return reservation;
}

async function getReservation(id: number): Promise<Reservation> {
  return fetch(RESERVATION_URL + "/" + id).then(handleHttpErrors);
}

// Create Reservation
async function createReservation(newReservation: Reservation): Promise<Reservation> {
  const options = makeOptions("POST", newReservation, true); 
  return fetch(RESERVATION_URL, options).then(handleHttpErrors);
}

// Delete Reservation
async function deleteReservation(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  await fetch(`${RESERVATION_URL}/${id}`, options).then(handleHttpErrors);
  console.log("Reservation with id: " + id + " has been deleted");
}

// Get Total Reservations
async function getAllBookings(): Promise<Booking[]> {
  if (booking.length > 0) return [...booking];
  const res = await fetch(BOOKING_URL).then(handleHttpErrors);
  booking = [...res];
  return booking;
}

async function getBooking(id: number): Promise<Booking> {
  return fetch(BOOKING_URL + "/" + id).then(handleHttpErrors);
}

// Create Total Reservation 
async function createBooking(newBooking: Booking): Promise<Booking> {
  const options = makeOptions("POST", newBooking, true); 
  return fetch(BOOKING_URL, options).then(handleHttpErrors);
}

// Delete Total Reservation 
async function deleteBooking(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  await fetch(`${BOOKING_URL}/${id}`, options).then(handleHttpErrors);
  console.log("Booking with id: " + id + " has been deleted");
}


// Get Movies
async function getAllMovies(): Promise<Array<Movie>> {
  if (movie.length > 0) return [...movie];
  const res = await fetch(MOVIE_URL).then(handleHttpErrors);
  movie = [...res];
  return movie;
}

async function getMovie(id: number): Promise<Movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

// Add Movie
async function addMovie(newMovie: Movie): Promise<Movie> {
  const method = newMovie.imdbID ? "PUT" : "POST";
  const options = makeOptions(method, newMovie);
  const URL = newMovie.imdbID ? `${MOVIE_URL}/${newMovie.imdbID}` : MOVIE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

// Delete Movie
async function deleteMovie(imdbID: string): Promise<Movie> {
  const options = makeOptions("DELETE", null);
  return fetch(`${MOVIE_URL}/${imdbID}`, options).then(handleHttpErrors);
}

// Get All Data
async function getAllData(): Promise<void> {
  try {
    const cinemas = await getAllCinemas();
    console.log("Cinemas:", cinemas);

    const screens = await getAllScreens();
    console.log("Screens:", screens);

    const seats = await getAllSeats();
    console.log("Seats:", seats);

    const screenings = await getAllScreenings();
    console.log("Screenings:", screenings);

    const cinemaId = 2; // Replace with the actual cinema ID
    const screeningsByCinema = await getScreeningsByCinemaId(cinemaId);
    console.log("Screenings by Cinema:", {cinemaId}, screeningsByCinema);

    const reservations = await getAllReservations();
    console.log("Reservations:", reservations);

    const bookings = await getAllBookings();
    console.log("Total Bookings:", bookings);

    const movies = await getAllMovies();
    console.log("Movies:", movies);
  } catch (error) {
    console.error("Error:", error);
  }
}

getAllData();

export type { Movie, Cinema, Screen, Seat, Screening, Reservation};
// eslint-disable-next-line react-refresh/only-export-components
export {  getAllCinemas,
          getCinema, 
          getAllScreens, 
          getScreen,
          getAllSeats,
          getSeat,
          getAllScreenings,
          getScreening,
          getScreeningsByCinemaId,
          getAllReservations,
          getReservation,
          createReservation,
          deleteReservation,
          getAllBookings,
          getBooking, 
          createBooking,
          deleteBooking,
          getAllMovies,
          getMovie,
          addMovie, 
          deleteMovie
        };
