import { useContext } from "preact/hooks";
import { router_context } from "./context";

export function useRouter() {
  const context = useContext(router_context);

  if (!context) {
    throw new Error("useRoute should be used within a Router");
  }

  return context;
}
