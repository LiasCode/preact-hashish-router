import { VNode } from "preact";
import { createRouter, MatchedRoute } from "rou3";

export type MatcherPayload = {
  component: VNode<any>;
  lazy: boolean;
  fallback: VNode<any> | null;
};

export type RouteMatched = MatchedRoute<MatcherPayload>;

export const Matcher = createRouter<MatcherPayload>();
