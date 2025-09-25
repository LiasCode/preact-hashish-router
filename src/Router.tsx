import type { PropsWithChildren } from "preact/compat";
import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";
import { findRoute } from "rou3";
import { parseURL } from "ufo";
import { HashisherContext, type HashisherContextVal } from "./context";
import { RenderMatchedRoute } from "./RenderMatchedRoute";
import { Matcher } from "./router/matcher";

export type RouterProps = PropsWithChildren<{
  /**
   * @default browser
   */
  type?: "hash" | "browser";
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

  /**
   * Trigger hook before push new route entry
   */
  onBeforeRouteChange?: (path: string) => Promise<void> | void;
  /**
   * Trigger hook after push new route entry
   */
  onRouteDidChange?: (path: string) => Promise<void> | void;
  /**
   * If true don't trigger hooks on first render
   * @default false
   */
  ignoreInitial?: boolean;
}>;

export const Router = ({
  type: router_type = "browser",
  ignoreInitial = false,
  ...props
}: RouterProps) => {
  const [active_path, set_active_path] = useState<HashisherContextVal["active_path"]>("/");
  const [params, setParams] = useState<HashisherContextVal["params"]>(undefined);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
  const [active_route_data, set_active_route_data] =
    useState<HashisherContextVal["active_route_data"]>(null);
  const renderCount = useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  const exec_route_change = useCallback(
    async (raw_path: string | null) => {
      const { params, path, route_data, search_params } = await calculateNextRouteData(
        raw_path,
        router_type
      );

      if (ignoreInitial === true) {
        if (renderCount.current !== 0) {
          await props.onBeforeRouteChange?.(path);
        }
      } else {
        await props.onBeforeRouteChange?.(path);
      }

      if (router_type === "browser") {
        window.history.pushState(null, "", path);
      }

      if (router_type === "hash") {
        window.location.hash = path;
      }

      set_active_path(path);
      setParams(params);
      setSearchParams(search_params);
      set_active_route_data(route_data);

      if (ignoreInitial === true) {
        if (renderCount.current !== 0) {
          await props.onRouteDidChange?.(path);
        }
      } else {
        await props.onRouteDidChange?.(path);
      }

      renderCount.current += 1;
    },
    [router_type, props.onBeforeRouteChange, props.onRouteDidChange]
  );

  useLayoutEffect(() => {
    if (router_type !== "browser") return;

    const listener = () => {
      exec_route_change(null);
    };

    window.addEventListener("popstate", listener);
    listener();

    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, [exec_route_change, router_type]);

  useLayoutEffect(() => {
    if (router_type !== "hash") return;

    const listener = () => {
      exec_route_change(null);
    };

    window.addEventListener("hashchange", listener);
    listener();

    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, [exec_route_change, router_type]);

  const go_imperative = async (newPath: string) => {
    const pathname = parseURL(newPath).pathname;
    exec_route_change(pathname);
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

const calculateNextRouteData = async (
  raw_path: string | null,
  router_type: RouterProps["type"] = "browser"
) => {
  const url = parseURL(window.location.href);

  let new_internal_path = raw_path || "";

  // If raw_path is null, we use the current path or hash from the URL.
  if (raw_path === null) {
    if (router_type === "hash") {
      new_internal_path = url.hash;
    } else {
      new_internal_path = url.pathname;
    }
  }

  const route_data = findRoute(Matcher, undefined, new_internal_path);

  if (!route_data) {
    return {
      path: new_internal_path,
      search_params: new URLSearchParams(url.search),
      route_data: null,
      params: undefined,
    };
  }

  return {
    path: new_internal_path,
    search_params: new URLSearchParams(url.search),
    route_data: { ...route_data.data },
    params: { ...route_data.params },
  };
};
