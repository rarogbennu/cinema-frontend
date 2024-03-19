import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Velkommen til ROLF* Kino</h1>
      <p>*rolling on laughing floors</p>
      <div className="cinemas-home-container">
        <Link to="/cinema/roskilde" className="card-button">
          Roskilde Bio
        </Link>
        <Link to="/cinema/kbh" className="card-button">
          KBH Bio
        </Link>
      </div>
      <div className="button-container">
        <button
          className="button-of-joy"
          onClick={() => setCount((count) => count + 1)}
        >
          Klik HER, hvis du havde en god oplevelse❤️!!!!
        </button>
        <p>Gode oplevelser: {count} </p>
      </div>
    </>
  );
}
