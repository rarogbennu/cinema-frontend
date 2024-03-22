import React, { useState } from "react";
import { addMovie } from "../../services/apiFacade";

export default function AddMovieForm() {
  const [imdbID, setimdbID] = useState("");
  console.log(imdbID);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setimdbID(event.target.value);
    console.log(imdbID);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addMovie(imdbID);
    console.log(imdbID);
    setimdbID("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IMDB-id"
          value={imdbID}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-button">
          Submit
        </button>
      </form>
    </div>
  );
}
