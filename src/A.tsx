import { type ComponentProps, forwardRef } from "preact/compat";
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
        if (event && event.type === "click") {
          // ignore events the browser takes care of already:
          if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.shiftKey ||
            event.button !== 0
          ) {
            return;
          }
        }

        event.preventDefault();

        go(href);
      }}
      {...props}
    />
  );
});
