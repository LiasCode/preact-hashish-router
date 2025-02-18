import { PropsWithChildren } from "preact/compat";
import { useEffect, useMemo, useState } from "preact/hooks";
import { RouterContext, router_context } from "./context";

const get_hash_route = () => location.hash.slice(1) || "/";

type RouterProps = PropsWithChildren & {
  type: RouterContext["type"];
};

export const Router = (props: RouterProps) => {
  const [path, setPath] = useState(get_hash_route());
  const [query, setQuery] = useState("");
  const [itMatch, setItMatch] = useState(false);

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

  useEffect(() => {
    if (router_type !== "hash") return;
    const [path, query] = get_hash_route().split("?");
    setQuery(query || "");
    setPath(path);

    hashEffectHandler.effect();
    return () => hashEffectHandler.cleanUp();
  }, []);

  useEffect(() => {
    if (router_type !== "browser") return;
    setPath(location.pathname);
    setQuery(location.search || "");
    browserEffectHandler.effect();
    return () => browserEffectHandler.cleanUp();
  }, []);

  const handlerManualRouteChange = (r: string) => {
    setPath(r);
    setItMatch(false);
    if (router_type === "hash") {
      location.hash = r;
      return;
    }
    if (router_type === "browser") {
      history.pushState(null, "", new URL(r, location.origin));
      return;
    }
  };

  const ProviderValue: RouterContext = useMemo(() => {
    return { path, go: handlerManualRouteChange, itMatch, setItMatch, type: router_type, query };
  }, [path, handlerManualRouteChange, itMatch, setItMatch, router_type]);

  return <router_context.Provider value={ProviderValue}>{props.children}</router_context.Provider>;
};
