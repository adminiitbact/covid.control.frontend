export function flattenRoutes(routes) {
  return routes.reduce((prev, el) => {
    if (el.children) {
      return [...prev, ...flattenRoutes(el.children)];
    }
    return [...prev, el];
  }, []);
}
