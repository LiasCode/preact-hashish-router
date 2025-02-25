import { PropsWithChildren } from "preact/compat";
import { useLayoutEffect, useMemo, useState } from "preact/hooks";
import { RouterContext, router_context } from "./context";

const get_hash_route = () => location.hash.slice(1) || "/";

type RouterProps = PropsWithChildren & {
  type: RouterContext["type"];
  /**
   * Only for `hash` routers.
   *
   * Decide if the initial pathname will be rewrite as the initial hash.
   *
   * `Caution`: This will replace the initial url hash
   * @default false
   */
  redirect_path_to_hash?: boolean;
};

export const Router = (props: RouterProps) => {
  const [path, setPath] = useState<string>();
  const [query, setQuery] = useState<string>("");
  const [itMatch, setItMatch] = useState<boolean>(false);

  const router_type = useMemo(() => {
    return props.type;
  }, [props.type]);

  const hashEffectHandler = {
    listener: () => {
      const [path, query] = get_hash_route().split("?");
      setQuery(query || "");
      setPath(path);
      setItMatch(false);
    },
    effect: () => {
      if (location.hash === "") location.hash = "/";
      window.addEventListener("hashchange", hashEffectHandler.listener);
    },
    cleanUp: () => {
      window.removeEventListener("hashchange", hashEffectHandler.listener);
    },
  };

  const browserEffectHandler = {
    listener: () => {
      setPath(location.pathname);
      setQuery(location.search || "");
      setItMatch(false);
    },
    effect: () => {
      window.addEventListener("popstate", browserEffectHandler.listener);
    },
    cleanUp: () => {
      window.removeEventListener("hashchange", browserEffectHandler.listener);
    },
  };

  useLayoutEffect(() => {
    if (router_type !== "hash") return;
    const [path, query] = get_hash_route().split("?");
    setQuery(query || "");
    setPath(path);

    if (props.redirect_path_to_hash === true) {
      if (location.pathname !== "/") {
        location.hash = location.pathname;
        location.pathname = "";
      }
    }
    hashEffectHandler.effect();
    return () => hashEffectHandler.cleanUp();
  }, []);

  useLayoutEffect(() => {
    if (router_type !== "browser") return;
    setPath(location.pathname);
    setQuery(location.search || "");
    browserEffectHandler.effect();
    return () => browserEffectHandler.cleanUp();
  }, []);

  const handlerManualRouteChange = (newPath: string) => {
    setPath(newPath);
    setItMatch(false);
    if (router_type === "hash") {
      location.hash = newPath;
      return;
    }
    if (router_type === "browser") {
      history.pushState(null, "", new URL(newPath, location.origin));
      return;
    }
  };

  const ProviderValue: RouterContext = useMemo(() => {
    return { path, go: handlerManualRouteChange, itMatch, setItMatch, type: router_type, query };
  }, [path, handlerManualRouteChange, itMatch, setItMatch, router_type]);

  return <router_context.Provider value={ProviderValue}>{props.children}</router_context.Provider>;
};
