import { PropsWithChildren, Suspense } from "preact/compat";
import { useInternalRouter } from "./useInternalRouter ";

export function ErrorRoute(props: PropsWithChildren<{ lazy?: boolean }>) {
  const router = useInternalRouter();

  if (router.itMatch) return null;

  if (props.lazy) {
    return <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>;
  }

  return props.children;
}
