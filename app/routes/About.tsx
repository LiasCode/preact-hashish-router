import { A } from "@router";

export default function AboutPage() {
  return (
    <div>
      <header>
        <h1>About</h1>
        <nav>
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <li>
              <A href="/">Home</A>
            </li>
            <li>
              <A href="/about">About</A>
            </li>
            <li>
              <A href="/test/1">Test :id</A>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
