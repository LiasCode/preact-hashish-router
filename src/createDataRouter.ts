import type { RouteProps } from "./Route";
import { Router } from "./Router";
import { add_route_to_matcher } from "./router/matcher";

export type RouteData = RouteProps & {
  children?: RouteData[] | undefined;
};

export function createDataRouter(data: RouteData[]) {
  addRoute(data);

  return Router;
}

function addRoute(data: RouteData[], stackPath = "") {
  for (const r of data) {
    const stackedPath = joinPathWithParent(stackPath, r.path);

    console.log(stackedPath);

    add_route_to_matcher(stackedPath, {
      element: r.element,
      fallback: r.fallback,
      lazy: r.lazy,
    });

    if (r.children && r.children.length > 0) {
      addRoute(r.children, stackedPath);
    }
  }
}

const joinPathWithParent = (parent: string, children: string) => {
  const steps = parent.split("/").filter(Boolean);
  const step_children = children.split("/").filter(Boolean);

  for (const s of step_children) {
    steps.push(s);
  }

  const stackedPath = `/${steps.join("/")}`;

  return stackedPath;
};
