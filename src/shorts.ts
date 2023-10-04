export const x = <T>(value: T | null | undefined): T => {
  if (value == null) throw new Error("should not be nullish");
  return value;
};

export const objEach = <K extends string, V, W>(
  obj: Record<K, V>,
  cb: (k: K, v: V) => W
) => {
  for (const k in obj) {
    cb(k, obj[k]);
  }
};

export const objMap = <K extends string, V, W>(
  obj: Record<K, V>,
  map: (k: K, v: V) => W
): Record<K, W> =>
  // @ts-ignore
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, map(k, v)]));
