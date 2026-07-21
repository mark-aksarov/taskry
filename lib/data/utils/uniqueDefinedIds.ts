// Return unique IDs, excluding null and undefined values
export function uniqueDefinedIds<T>(ids: (T | null | undefined)[]): T[] {
  return [...new Set(ids.filter((id): id is T => id != null))];
}
