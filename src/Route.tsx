import { VNode } from "preact";
import { PropsWithChildren, Suspense } from "preact/compat";
import { useRouter } from "./useRouter";

type RouteProps = PropsWithChildren & { path: string; exact?: boolean; lazy?: boolean; fallback?: VNode };

export function Route(props: RouteProps) {
  const router = useRouter();

  if (props.exact === undefined) {
    props.exact = true;
  }

  if (props.exact && router.path !== props.path) {
    return null;
  } else if (!router.path.includes(props.path)) {
    return null;
  }

  router.setItMatch(true);

  if (props.lazy) {
    return <Suspense fallback={props.fallback ?? <div>Loading...</div>}>{props.children}</Suspense>;
  }

  return props.children;
}
