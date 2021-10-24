export function urlsMatch(url1: string, url2: string): boolean {
  /* remove leading & trailing slash */
  const stripped1 = url1.replace(/^\/|\/$/g, '');
  const stripped2 = url2.replace(/^\/|\/$/g, '');

  /* empty or same */
  if (stripped1 === stripped2) {
    return true;
  }

  /* only one is empty ,so they're not the same */
  if (!stripped1 || !stripped2) {
    return false;
  }

  /* to match parent & sub routes */
  return stripped2.startsWith(stripped1);
}
