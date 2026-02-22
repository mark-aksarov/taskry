export function areSearchParamsEqual({
  a,
  b,
  excludeKeys = [],
  includeKeys,
}: {
  a: URLSearchParams;
  b: URLSearchParams;
  excludeKeys?: string[];
  includeKeys?: string[];
}): boolean {
  // helper function to normalize search params by including/excluding keys, removing empty values, then sorting
  const normalize = (params: URLSearchParams) => {
    const filtered = new URLSearchParams();

    for (const [key, value] of params.entries()) {
      // skip empty values
      if (value === "") continue;

      // if includeKeys is set, only include those keys
      if (includeKeys && !includeKeys.includes(key)) continue;

      // if excludeKeys is set, skip those keys
      if (excludeKeys.includes(key)) continue;

      filtered.append(key, value);
    }

    // sort by key to ensure consistent ordering
    return new URLSearchParams([...filtered.entries()].sort()).toString();
  };

  // normalize both and compare
  return normalize(a) === normalize(b);
}
