import { useState } from "preact/hooks";
import { Header } from "../layout/Header";
import "./Home.css";

export function About() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <h1>About Page</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Check out{" "}
        <a
          href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
          target="_blank"
          rel="noreferrer"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs">Click on the Vite and Preact logos to learn more</p>
    </>
  );
}
