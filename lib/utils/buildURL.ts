export function buildURL(
  base: string,
  params?: Record<string, string | null | undefined>,
) {
  const q = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value != null && value !== "") q.set(key, value);
    }
  }

  const query = q.toString();

  return query ? `${base}?${query}` : base;
}
