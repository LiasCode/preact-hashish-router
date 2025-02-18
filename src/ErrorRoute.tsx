import { PropsWithChildren, Suspense } from "preact/compat";
import { useRouter } from "./useRouter";

export function ErrorRoute(props: PropsWithChildren<{ lazy?: boolean }>) {
  const router = useRouter();

  if (router.itMatch) return null;

  if (props.lazy) {
    return <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>;
  }

  return props.children;
}
