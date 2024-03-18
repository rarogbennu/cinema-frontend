import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Velkommen til kino</h1>
      <button className="card">Roskilde Bio</button>
      <button className="card">Kbh Bio</button>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Klik HER, hvis du havde en god oplevelse❤️!!!!
        </button>
        <p>Gode oplevelser: {count} </p>
      </div>
    </>
  );
}
