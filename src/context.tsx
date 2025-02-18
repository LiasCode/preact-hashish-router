import { createContext } from "preact";

export type RouterContext = {
  path: string;
  query: string;
  go: (r: string) => void;
  itMatch: boolean;
  setItMatch: (r: boolean) => void;
  type: "hash" | "browser";
};

export const router_context = createContext<RouterContext>(null);
