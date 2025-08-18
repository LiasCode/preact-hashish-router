import { A } from "preact-hashish-router";
import "./Header.css";

export function Header() {
  const id = Math.trunc(Math.random() * 10);

  return (
    <header class="header">
      <h1>Basic Preact Hashish Router</h1>
      <nav>
        <A href="/">Home</A>
        <A href="/about">About</A>
        <A href={`/product/${id}`}>:Dynamic {id}</A>
        <A href={`/one-level-wildcard/only-one-level`}>One Level Wildcard</A>
        <A href={`/all-level-wildcard/all/the/levels`}>All Level Wildcard</A>

        <A href="/nothing-here">Nothing Here (404)</A>
      </nav>
    </header>
  );
}
