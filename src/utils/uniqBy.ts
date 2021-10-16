export function uniqBy<T extends Object>(
  arr: T[],
  key: (item: T) => T[keyof T]
) {
  const seen = new Set();
  return arr.filter((item) => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
