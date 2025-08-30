import { useState } from "preact/hooks";
import preactLogo from "../assets/preact.svg";
import { Header } from "../layout/Header";
import "./Home.css";
import viteLogo from "/vite.svg";

export function About() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <a
          href="https://vite.dev"
          target="_blank" rel="noreferrer"
        >
          <img
            src={viteLogo}
            class="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://preactjs.com"
          target="_blank" rel="noreferrer"
        >
          <img
            src={preactLogo}
            class="logo preact"
            alt="Preact logo"
          />
        </a>
      </div>
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
          target="_blank" rel="noreferrer"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs">Click on the Vite and Preact logos to learn more</p>
    </>
  );
}
