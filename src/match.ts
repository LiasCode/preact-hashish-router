/**
 * This function is used to match a URL path against a URL path pattern.
 * All credit goes to preact-iso team.
 */

export type Matches = {
  params: {
    [param: string]: string;
  };
  rest?: string;
};

/**
 * Check if a URL path matches against a URL path pattern.
 *
 * Warning: This is an internal API exported only for testing purpose. API could change in future.
 * @param urlSteps - URL path (e.g. /user/12345)
 * @param routeSteps - URL pattern (e.g. /user/:id)
 */
export const matchRoute = (url, route, matches: Matches = { params: {} }): Matches | undefined => {
  const urlSteps = url.split("/").filter(Boolean);
  const routeSteps = (route || "").split("/").filter(Boolean);

  if (!matches.params) matches.params = {};

  for (let i = 0, val: any, rest: any; i < Math.max(urlSteps.length, routeSteps.length); i++) {
    let [, m, param, flag] = (routeSteps[i] || "").match(/^(:?)(.*?)([+*?]?)$/);
    val = urlSteps[i];
    // segment match:
    if (!m && param == val) continue;
    // /foo/* match
    if (!m && val && flag == "*") {
      matches.rest = "/" + urlSteps.slice(i).map(decodeURIComponent).join("/");
      break;
    }
    // segment mismatch / missing required field:
    if (!m || (!val && flag != "?" && flag != "*")) return;
    rest = flag == "+" || flag == "*";
    // rest (+/*) match:
    if (rest) val = urlSteps.slice(i).map(decodeURIComponent).join("/") || undefined;
    // normal/optional field:
    else if (val) val = decodeURIComponent(val);
    matches.params[param] = val;

    if (rest) break;
  }
  return matches;
};
