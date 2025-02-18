import { AnchorHTMLAttributes, forwardRef, MouseEventHandler, PropsWithChildren } from "preact/compat";
import { useCallback, useMemo } from "preact/hooks";
import { useRouter } from "./useRouter";

export type AProps = PropsWithChildren & AnchorHTMLAttributes;

export const A = forwardRef<HTMLAnchorElement, AProps>(({ href, className, ...props }) => {
  const router = useRouter();

  const isActive = useMemo(() => {
    return router.path === href;
  }, [router.path, href]);

  const browserRouterClickAnchorHandler: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      router.go(href.toString());
    },
    [router.type]
  );

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
