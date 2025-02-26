import { VNode } from "preact";
import { PropsWithChildren, Suspense, useLayoutEffect, useState } from "preact/compat";
import { matchRoute } from "./match";
import { useInternalRouter } from "./useInternalRouter ";

export type RouteProps = PropsWithChildren & { path: string; exact?: boolean; lazy?: boolean; fallback?: VNode };

export function Route(props: RouteProps) {
  const router = useInternalRouter();
  const [render, setRender] = useState(false);

  useLayoutEffect(() => {
    setRender(false);

    if (props.exact === undefined) {
      props.exact = false;
    }

    if (props.exact === true && router.path !== props.path) {
      return;
    }

    const matches = matchRoute(router.path || "/", props.path);

    if (props.exact === false && matches === undefined) {
      return;
    }

    router.setParams(matches.params);
    router.setRest(matches.rest);
    router.setItMatch(true);
    setRender(true);
  }, [router.path]);

  if (!render) return null;

  if (props.lazy) {
    return <Suspense fallback={props.fallback ?? <div>Loading...</div>}>{props.children}</Suspense>;
  }

  return props.children;
}
