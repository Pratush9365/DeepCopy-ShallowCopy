export type DeepCopyType<T> = T extends object
  ? {[K in keyof T]: DeepCopyType<T[K]>}
  : T;

export function deepCopy<T>(obj: T): DeepCopyType<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj as DeepCopyType<T>;
  }

  const newObj = (Array.isArray(obj) ? [] : {}) as DeepCopyType<T>;
  const keys = Object.keys(obj) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const value = (obj as Record<string, unknown>)[key as string];
    (newObj as Record<string, unknown>)[key as string] = deepCopy(
      value,
    ) as unknown;
  }

  return newObj;
}
