// import { API_URL } from "../settings";
// import { makeOptions, handleHttpErrors } from "./fetchUtils";
// const MOVIE_URL = API_URL + "/movies";

interface Movie {
  id: number | null;
  name: string;
  duration: string;
  description: string;
  poster: string;
  starringActors: string;
  instructor: string;
}
// @ts-ignore
let movies: Array<Movie> = [];

// async function getMovies(): Promise<Array<Movie>> {
//   if (movies.length > 0) return [...movies];
//   console.log("fetching movies");

//   return fetch(MOVIE_URL + queryParams).then(handleHttpErrors);
// }

function getMovies() {
  return [
    {
      id: 1,
      name: "Dude, Where's My Car",
      duration: "1h 23min",
      poster: "https://example.com/dude_wheres_my_car_poster.jpg",
      director: "Danny Leiner",
      description:
        "Two potheads wake up after a night of partying and cannot remember where they parked their car.",
    },
    {
      id: 2,
      name: "Avatar",
      duration: "2h 42min",
      poster: "https://example.com/avatar_poster.jpg",
      director: "James Cameron",
      description:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    },
    {
      id: 3,
      name: "Shrek",
      duration: "1h 30min",
      poster: "https://example.com/shrek_poster.jpg",
      director: "Andrew Adamson, Vicky Jenson",
      description:
        "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
    },
  ];
}

// async function getMovie(id: number): Promise<Movie> {
//   //@ts-ignore
//   if (movies.length > 0) return [...movies];
//   return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
// }

function getMovie(id: number) {
  return console.log("fetching movie #", id);
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
function getAllCinemas() {
  return console.log("fetching all cinemas");
}

export type { Movie };
// eslint-disable-next-line react-refresh/only-export-components
export { getMovies, getMovie, addMovie, deleteMovie, getAllCinemas };
