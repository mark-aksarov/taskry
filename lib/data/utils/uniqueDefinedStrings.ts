// Return unique non-empty strings, excluding null and undefined values
export function uniqueDefinedStrings(
  values: (string | null | undefined)[],
): string[] {
  return [
    ...new Set(
      values
        .filter((value): value is string => value != null)
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ];
}
