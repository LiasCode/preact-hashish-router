import { VNode } from "preact";
import { add_route_to_matcher } from "./router/matcher";

export type RouteProps = {
  /** The route path matcher
   *  @example "/"
   *  "/product/:id"
   *  "/paper/*"
   *  "/docs/**"
   */
  path: string;

  /** The node that will be rendered if match */
  element: VNode<any>;

  /** Shoud be wrapped in a \<Suspense /> tag */
  lazy?: boolean;

  /** Fallback to display when the element is loading when lazy is true */
  fallback?: VNode;
};

export function Route(props: RouteProps) {
  add_route_to_matcher(props.path, props);
  return <></>;
}
