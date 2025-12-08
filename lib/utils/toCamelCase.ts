export function toCamelCase(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove all non-alphanumeric characters except space
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}
