/**
 * Check if two arrays are the same.
 */
export function isSameArray<T>(a: T[], b: T[]) {
  return a === b || (a.length === b.length && a.every((v, i) => v === b[i]))
}

export const isArray = Array.isArray
