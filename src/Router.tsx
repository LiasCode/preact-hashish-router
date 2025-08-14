import { PropsWithChildren } from "preact/compat";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import { findRoute } from "rou3";
import { parseURL } from "ufo";
import { HashisherContext, HashisherContextVal } from "./context";
import { RenderMatchedRoute } from "./RenderMatchedRoute";
import { Matcher } from "./router/matcher";

export type RouterProps = PropsWithChildren<{
  type: /*"hash"*/ "browser";
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

  const execute_path_change = useCallback((raw_path: string | null) => {
    const url = parseURL(window.location.href);

    const newPath = raw_path === null ? url.pathname : raw_path;

    const route_data = findRoute(Matcher, undefined, newPath);

    if (!route_data) {
      set_active_route_data(null);
      setParams(undefined);
      return;
    }

    set_active_path(newPath);
    setSearchParams(new URLSearchParams(url.search));
    setParams({ ...route_data.params });
    set_active_route_data({ ...route_data.data });

    if (props.type === "browser") {
      window.history.pushState(null, "", newPath);
    }
  }, []);

  useLayoutEffect(() => {
    if (props.type !== "browser") return;

    const listener = () => {
      execute_path_change(null);
    };

    window.addEventListener("popstate", listener);
    listener();

    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, []);

  const go_imperative = (newPath: string) => {
    const pathname = parseURL(newPath).pathname;
    execute_path_change(pathname);
  };

  return (
    <HashisherContext.Provider
      value={{
        active_path,
        searchParams,
        params,
        active_route_data,
        go: go_imperative,
      }}
    >
      {props.children}
      <RenderMatchedRoute />
    </HashisherContext.Provider>
  );
};
