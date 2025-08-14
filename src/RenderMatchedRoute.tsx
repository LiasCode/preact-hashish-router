import { Suspense } from "preact/compat";
import { useHashisherContext } from "./context";
import { get_not_found_element } from "./NotFound";

export const RenderMatchedRoute = () => {
  const { active_route_data } = useHashisherContext();

  if (!active_route_data) return get_not_found_element();

  if (active_route_data.component === null) {
    return get_not_found_element();
  }

  if (active_route_data.lazy) {
    return <Suspense fallback={active_route_data.fallback}>{active_route_data.component}</Suspense>;
  }

  return active_route_data.component;
};
