import React, { useState, useEffect } from "react";
import {
  getAllCinemas,
  Cinema,
  getAllMovies,
  getAllScreens,
  addScreening,
} from "../../services/apiFacade";
import { Movie, Screen } from "../../services/apiFacade";

import "../admin/adminScreenings.css";

function AddScreeningForm() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<number>();
  const [selectedScreen, setSelectedScreen] = useState<number>();
  const [selectedMovie, setSelectedMovie] = useState<number>();
  const [is3D, setIs3D] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const fetchCinemasAndMovies = async () => {
      try {
        const cinemas = await getAllCinemas();
        const movies = await getAllMovies();
        const screens = await getAllScreens();
        setCinemas(cinemas);
        setScreens(screens);
        setMovies(movies);
        console.log(movies);
      } catch (error) {
        console.error("Error fetching cinemas and movies:", error);
      }
    };

    fetchCinemasAndMovies();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "cinema") {
      setSelectedCinema(Number(value));
    } else if (name === "screen") {
      setSelectedScreen(Number(value));
    } else if (name === "movie") {
      setSelectedMovie(Number(value));
    } else if (name === "is3D") {
      // @ts-ignore
      setIs3D(event.target.checked);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addScreening({
        id: 0,
        cinemaId: selectedCinema!,
        screenId: selectedScreen!,
        movieId: selectedMovie!,
        is3D,
        date,
      });
      console.log("Visningen er tilføjet med succes!");
      setSelectedCinema(undefined);
      setSelectedScreen(undefined);
      setSelectedMovie(undefined);
      setIs3D(false);
      setDate("");
    } catch (error) {
      console.error(
        "Der opstod en fejl under tilføjelsen af visningen:",
        error
      );
    }
  };

  return (
    <div className="add-screening-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Vælg biograf:
          <select
            name="cinema"
            value={selectedCinema}
            onChange={handleInputChange}
          >
            <option value="">Vælg biograf</option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id ?? ""}>
                {cinema.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Vælg sal:
          <select
            name="screen"
            value={selectedScreen}
            onChange={handleInputChange}
          >
            <option value="">Vælg sal</option>
            {screens.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Vælg film:
          <select
            name="movie"
            value={selectedMovie}
            onChange={handleInputChange}
          >
            <option value="">Vælg film</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.Title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Er det i 3D?
          <input
            type="checkbox"
            name="is3D"
            checked={is3D}
            // @ts-ignore
            onChange={handleInputChange}
          />
        </label>
        <label>
          Vælg dato og tidspunkt:
          <input
            type="datetime-local"
            name="date"
            value={date}
            // @ts-ignore
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="add-button">
          Opret
        </button>
      </form>
    </div>
  );
}

export default AddScreeningForm;
