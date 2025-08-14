import { VNode } from "preact";
import { Suspense } from "preact/compat";
import { useHashisherContext } from "./context";

export const RenderMatchedRoute = () => {
  const { active_route_data } = useHashisherContext();

  if (!active_route_data) return not_found_element;

  if (active_route_data.component === null) {
    return not_found_element;
  }

  if (active_route_data.lazy) {
    return <Suspense fallback={active_route_data.fallback}>{active_route_data.component}</Suspense>;
  }

  return active_route_data.component;
};

let not_found_element: VNode<any> = <div>404 Not Found</div>;

export const set_not_found_element = (el: VNode<any>) => {
  not_found_element = el;
};
