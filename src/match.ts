export type Matches = {
  params: Record<string, string>;
  rest?: string;
};

/**
 * Compara una URL contra un patrón definido y extrae parámetros.
 * @param url - La URL a analizar (ejemplo: "/user/12345").
 * @param route - El patrón de URL (ejemplo: "/user/:id").
 * @param matches - Objeto opcional para acumular coincidencias, inicializado por defecto.
 * @returns Un objeto Matches si la URL coincide con el patrón; de lo contrario, undefined.
 */
export const matchRoute = (url: string, route: string, matches: Matches = { params: {} }): Matches | undefined => {
  const urlSegments = url.split("/").filter(Boolean);
  const routeSegments = route.split("/").filter(Boolean);

  // Se itera hasta el máximo número de segmentos entre la URL y el patrón para cubrir ambos casos.
  for (let i = 0; i < Math.max(urlSegments.length, routeSegments.length); i++) {
    // Extrae y desestructura el segmento actual del patrón:
    // - isParam: indica si el segmento es un parámetro (comienza con ":").
    // - paramName: nombre del parámetro o valor literal.
    // - modifier: puede ser '+', '*' o '?' para modificar el comportamiento de captura.
    const [, isParam, paramName, modifier] = (routeSegments[i] || "").match(/^(:)?(.*?)([+*?]?)$/) || [];

    // Si el segmento del patrón no es un parámetro y coincide exactamente con el de la URL, continúa.
    if (!isParam && paramName === urlSegments[i]) continue;

    // Si no es parámetro y el modificador es '*' se captura el resto de la URL.
    if (!isParam && modifier === "*") {
      matches.rest = `/${urlSegments.slice(i).map(decodeURIComponent).join("/")}`;
      break;
    }

    // Valida que el segmento sea un parámetro y que, si es obligatorio, exista en la URL.
    if (!isParam || (!urlSegments[i] && modifier !== "?" && modifier !== "*")) return;

    // Determina si el modificador indica la captura del resto de la URL ('+' o '*').
    const isRest = modifier === "+" || modifier === "*";

    // Asigna el valor del parámetro:
    // - Si es una captura 'rest', se unen todos los segmentos restantes.
    // - De lo contrario, se decodifica el segmento individual.
    matches.params[paramName] = isRest
      ? urlSegments.slice(i).map(decodeURIComponent).join("/")
      : decodeURIComponent(urlSegments[i]);

    // Si se capturaron múltiples segmentos (caso de 'rest'), se interrumpe la iteración.
    if (isRest) break;
  }

  return matches;
};
