import { render } from "preact";
import { App } from "./App";

const $root = document.querySelector("#app-root");

if (!$root) throw new Error("Root app component does not exists");

render(<App />, $root);
