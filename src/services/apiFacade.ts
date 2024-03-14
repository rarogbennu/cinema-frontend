import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const MOVIE_URL = API_URL + "/movies";
const CINEMA_URL = API_URL + "/cinemas";

interface Cinema {
  id: number | null;
  name: string;
  location: string;
  screens: string;
}

interface Movie {
  id: number | null;
  name: string;
  duration: string;
  description: string;
  poster: string;
  starringActors: string;
  instructor: string;
}
let cinemas: Cinema[] = [];
let movies: Array<Movie> = [];

async function getMovies(): Promise<Array<Movie>> {
  if (movies.length > 0) return [...movies];
  console.log("fetching movies");
  return fetch(MOVIE_URL).then(handleHttpErrors);
}

async function getMovie(id: number): Promise<Movie> {
  //@ts-ignore
  if (movies.length > 0) return [...movies];
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

async function addMovie(newMovie: Movie): Promise<Movie> {
  const method = newMovie.id ? "PUT" : "POST";
  const options = makeOptions(method, newMovie);
  const URL = newMovie.id ? `${MOVIE_URL}/${newMovie.id}` : MOVIE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteMovie(id: number): Promise<Movie> {
  const options = makeOptions("DELETE", null);
  return fetch(`${MOVIE_URL}/${id}`, options).then(handleHttpErrors);
}

async function getCinema(id: number): Promise<Cinema> {
  return fetch(CINEMA_URL + "/" + id).then(handleHttpErrors);
}

async function getAllCinemas(): Promise<Cinema[]> {
  if (cinemas.length > 0) return [...cinemas];
  const res = await fetch(CINEMA_URL).then(handleHttpErrors);
  cinemas = [...res];
  return cinemas;
}

export type { Movie, Cinema };
// eslint-disable-next-line react-refresh/only-export-components
export { getMovies, getMovie, addMovie, deleteMovie, getAllCinemas, getCinema };
