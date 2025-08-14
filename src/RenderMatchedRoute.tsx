import { Suspense } from "preact/compat";
import { useHashisherContext } from "./context";

export const RenderMatchedRoute = () => {
  const { active_path, active_route_data, params } = useHashisherContext();
  if (!active_route_data) return;

  console.log("Rendering ", active_path, active_route_data, params);

  if (active_route_data.lazy) {
    return <Suspense fallback={active_route_data.fallback}>{active_route_data.component}</Suspense>;
  }

  return active_route_data.component;
};
