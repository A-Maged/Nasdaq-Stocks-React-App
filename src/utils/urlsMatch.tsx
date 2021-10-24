export function urlsMatch(url1: string, url2: string): boolean {
  const leadingAndTrailingSlash = /^\/|\/$/g;
  const stripped1 = url1.replace(leadingAndTrailingSlash, '');
  const stripped2 = url2.replace(leadingAndTrailingSlash, '');

  if (stripped1 === stripped2) {
    return true;
  }

  /* only one is empty ,so they're not the same */
  if (!stripped1 || !stripped2) {
    return false;
  }

  /* match parent/sub routes */
  return stripped2.startsWith(stripped1);
}
