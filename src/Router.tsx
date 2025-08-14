import { PropsWithChildren } from "preact/compat";
import { useLayoutEffect, useState } from "preact/hooks";
import { findRoute } from "rou3";
import { HashisherContext, HashisherContextVal } from "./context";
import { RenderMatchedRoute } from "./RenderMatchedRoute";
import { Matcher } from "./router/matcher";

export type RouterProps = PropsWithChildren<{
  type: "hash" | "browser";
}>;

export const Router = (props: RouterProps) => {
  const [active_path, set_active_path] = useState<HashisherContextVal["active_path"]>(() => {
    if (typeof window !== "undefined") return window.location.pathname;
    return null;
  });
  const [params, setParams] = useState<HashisherContextVal["params"]>(undefined);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
  const [active_route_data, set_active_route_data] =
    useState<HashisherContextVal["active_route_data"]>(null);

  useLayoutEffect(() => {
    if (active_path === null) return;

    const route_data = findRoute(Matcher, undefined, active_path);

    if (!route_data) {
      set_active_route_data(null);
      setParams(undefined);
      return;
    }

    setParams({ ...route_data.params });
    set_active_route_data({ ...route_data.data });
  }, [active_path]);

  return (
    <HashisherContext.Provider
      value={{
        active_path,
        searchParams,
        params,
        active_route_data,
        go(newPath) {
          const new_path_normalized = newPath.startsWith("/") ? newPath.substring(1) : newPath;

          const url = new URL(new_path_normalized, window.location.origin);

          set_active_path(url.pathname);
          setSearchParams(url.searchParams);

          window.history.pushState(null, "", url);
        },
      }}
    >
      {props.children}
      <RenderMatchedRoute />
    </HashisherContext.Provider>
  );
};
