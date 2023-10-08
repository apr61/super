export function createRouterPath(path) {
  let pathArray = path.split(" ");
  if (pathArray.length > 0) {
    return pathArray.join("-");
  }
  return path;
}

export function getBusinessIdFromRoutePath(path) {
  path = path.split('-')
  return path.at(-1)
}