import { createContext } from "preact";
import { Matches } from "./match";

export type RouterContext = {
  type: "hash" | "browser";

  path: string;
  query: string;

  go: (r: string) => void;

  itMatch: boolean;
  setItMatch: (r: boolean) => void;

  params: Matches["params"];
  setParams: (p: Matches["params"]) => void;

  rest: Matches["rest"];
  setRest: (r: Matches["rest"]) => void;
};

export const router_context = createContext<RouterContext>(null);
