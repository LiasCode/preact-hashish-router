import { ComponentProps, forwardRef } from "preact/compat";
import { useHashisherContext } from "./context";

export type AProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export const A = forwardRef<HTMLAnchorElement, AProps>(({ href, ...props }, forwardedRef) => {
  const { go } = useHashisherContext();

  if (!href) {
    throw new Error("A: href must be defined");
  }

  return (
    <a
      ref={forwardedRef}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        go(href);
      }}
      {...props}
    />
  );
});
