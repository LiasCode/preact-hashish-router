import { useContext } from "preact/hooks";
import { router_context, RouterContext } from "./context";

export type PublicRouterContext = Pick<RouterContext, "go" | "path" | "params" | "rest" | "query">;

export function useRouter(): PublicRouterContext {
  const context = useContext(router_context);

  if (!context) {
    throw new Error("useRouter should be used within a Router");
  }

  const { go, path, params, rest, query } = context;

  return {
    go,
    path,
    params,
    rest,
    query,
  };
}
