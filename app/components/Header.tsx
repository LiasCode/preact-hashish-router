import { A } from "@router";

export function Header() {
  return (
    <nav>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <li>
          <A href="/?name=hola">Home</A>
        </li>

        <li>
          <A href="/about">About</A>
        </li>

        <li>
          <A href="/test/1">Test :id</A>
        </li>

        <li>
          <A href="/rest/anything/hey/withlove">Rest Test</A>
        </li>

        <li>
          <A href="/redirect">Redirect Page</A>
        </li>
      </ul>
    </nav>
  );
}
