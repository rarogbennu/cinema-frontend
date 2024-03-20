import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="center">
        <h1>Velkommen til ROLF* Kino</h1>
        <p>*rolling on laughing floors</p>
        <div className="cinemas-home-container">
          <Link to="/cinemas/2" className="card-button">
            Roskilde <br />
            Bio
          </Link>
          <Link to="/cinemas/1" className="card-button">
            København <br />
            Bio
          </Link>
        </div>
        <div className="button-container">
          <button
            className="button-of-joy"
            onClick={() => setCount((count) => count + 1)}
          >
            God oplevelse? <br />
            Klik HER❤️
          </button>
          <p>Gode oplevelser: {count} </p>
        </div>
      </div>
    </>
  );
}
