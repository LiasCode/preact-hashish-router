import { useContext } from "preact/hooks";
import { router_context } from "./context";

export function useInternalRouter() {
  const context = useContext(router_context);

  if (!context) {
    throw new Error("useInternalRouter should be used within a Router");
  }

  return context;
}
