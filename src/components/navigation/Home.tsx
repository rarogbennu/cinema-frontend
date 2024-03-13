import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Velkommen til kino</h1>
      <div>
        <button className="card" onClick={() => setCount((count) => count + 1)}>
          Klik her, hvis du havde en god oplevelse❤️!!!
        </button>
        <p>Gode oplevelser: {count} </p>
      </div>
    </>
  );
}
