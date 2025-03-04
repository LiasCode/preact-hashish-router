import { Fragment, useLayoutEffect } from "preact/compat";
import { useInternalRouter } from "./useInternalRouter";

export type RedirectProps = {
  to: string;
};

export const Redirect = (props: RedirectProps) => {
  const router = useInternalRouter();

  useLayoutEffect(() => {
    router.go(props.to);
  }, []);

  return <Fragment></Fragment>;
};
