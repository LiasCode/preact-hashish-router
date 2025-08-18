import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { RouteMatched } from "./router/matcher";

export type HashisherContextVal = {
  active_path: string | null;
  params: RouteMatched["params"];
  active_route_data: RouteMatched["data"] | null;
  searchParams: URLSearchParams;
};

export type HashisherContextMethods = {
  go(newPath: string): void;
};

export const HashisherContext = createContext<HashisherContextVal & HashisherContextMethods>({
  active_path: "",
  active_route_data: null,
  params: undefined,
  searchParams: new URLSearchParams(),
  go() {},
});

export const useHashisherContext = () => {
  const c = useContext(HashisherContext);
  if (!c) throw new Error("useHashisherContext should be inside a HashisherContext provider");
  return c;
};

export function useParams<T extends Record<string, string>>(): T & {
  /** Wrap wildcards on multilevels path
   * @example
   * `/docs/**` will return `{"_": "some/thing"}` if the path is `/docs/some/thing`
   */
  _?: string;
} {
  const c = useContext(HashisherContext);
  if (!c) throw new Error("useParams should be inside a HashisherContext provider");
  return c.params as T;
}

export function useSearchParams() {
  const c = useContext(HashisherContext);
  if (!c) throw new Error("useSearchParams should be inside a HashisherContext provider");
  return c.searchParams;
}

export const useRouter = () => {
  const c = useContext(HashisherContext);

  if (!c) throw new Error("useRouter should be inside a HashisherContext provider");

  return {
    path: c.active_path,
    params: c.params,
    searchParams: c.searchParams,
    go: c.go,
  };
};
