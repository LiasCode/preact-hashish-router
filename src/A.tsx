import { AnchorHTMLAttributes, forwardRef, MouseEventHandler, PropsWithChildren } from "preact/compat";
import { useMemo } from "preact/hooks";
import { useInternalRouter } from "./useInternalRouter";

export type AProps = PropsWithChildren & AnchorHTMLAttributes;

export const A = forwardRef<HTMLAnchorElement, AProps>(({ href, className, ...props }) => {
  const router = useInternalRouter();

  const isActive = useMemo(() => router.path === (href as string)?.split("?")[0], [router.path, href]);

  const browserRouterClickAnchorHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!href) return;
    router.go(href.toString());
  };

  return (
    <a
      href={router.type === "browser" ? href : `#${href}`}
      className={className}
      data-route-active={isActive}
      {...props}
      onClick={router.type === "browser" ? browserRouterClickAnchorHandler : undefined}
    />
  );
});
