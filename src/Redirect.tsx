import { Fragment, useLayoutEffect } from "preact/compat";
import { useRouter } from "./useRouter";

export type RedirectProps = {
  to: string;
};

export const Redirect = (props: RedirectProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.go(props.to);
  }, []);

  return <Fragment></Fragment>;
};
