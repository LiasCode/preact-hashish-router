import type { PropsWithChildren } from "preact/compat";
import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import { findRoute } from "rou3";
import { parseURL } from "ufo";
import { HashisherContext, type HashisherContextVal } from "./context";
import { RenderMatchedRoute } from "./RenderMatchedRoute";
import { Matcher } from "./router/matcher";

export type RouterProps = PropsWithChildren<{
  type: "hash" | "browser";
  /**
   * Only for `hash` routers.
   *
   * Decide if the initial pathname will be rewrite as the initial hash.
   *
   * `Caution`: This will replace the initial url hash
   * @default false
   * @deprecated
   */
  redirect_path_to_hash?: boolean;
}>;

export const Router = (props: RouterProps) => {
  const [active_path, set_active_path] = useState<HashisherContextVal["active_path"]>("/");
  const [params, setParams] = useState<HashisherContextVal["params"]>(undefined);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
  const [active_route_data, set_active_route_data] =
    useState<HashisherContextVal["active_route_data"]>(null);

  const execute_path_change = useCallback(
    (raw_path: string | null) => {
      const url = parseURL(window.location.href);

      let new_internal_path = raw_path || "";

      // If raw_path is null, we use the current path or hash from the URL.
      if (raw_path === null) {
        if (props.type === "hash") {
          new_internal_path = url.hash;
        } else {
          new_internal_path = url.pathname;
        }
      }

      const route_data = findRoute(Matcher, undefined, new_internal_path);

      if (!route_data) {
        set_active_path(new_internal_path);
        setSearchParams(new URLSearchParams(url.search));

        set_active_route_data(null);
        setParams(undefined);

        if (props.type === "browser") {
          window.history.pushState(null, "", new_internal_path);
        }
        if (props.type === "hash") {
          window.location.hash = new_internal_path;
        }
        return;
      }

      set_active_path(new_internal_path);
      setSearchParams(new URLSearchParams(url.search));
      setParams({ ...route_data.params });
      set_active_route_data({ ...route_data.data });

      if (props.type === "browser") {
        window.history.pushState(null, "", new_internal_path);
      }

      if (props.type === "hash") {
        window.location.hash = new_internal_path;
      }
    },
    [props.type]
  );

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
  }, [execute_path_change, props.type]);

  useLayoutEffect(() => {
    if (props.type !== "hash") return;

    const listener = () => {
      execute_path_change(null);
    };

    window.addEventListener("hashchange", listener);
    listener();

    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, [execute_path_change, props.type]);

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
