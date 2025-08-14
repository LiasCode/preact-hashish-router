import { VNode } from "preact";
import { addRoute, createRouter, MatchedRoute } from "rou3";
import { RouteProps } from "../Route";

export type MatcherPayload = {
  component: VNode<any>;
  lazy: boolean;
  fallback: VNode<any> | null;
};

export type RouteMatched = MatchedRoute<MatcherPayload>;

export const Matcher = createRouter<MatcherPayload>();

export const add_route_to_matcher = (path: string, data: Omit<RouteProps, "path">) => {
  addRoute(Matcher, undefined, path, {
    component: data.element,
    fallback: data.fallback || null,
    lazy: Boolean(data.lazy),
  });
};
