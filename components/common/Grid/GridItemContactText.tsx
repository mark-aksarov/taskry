// GridItemContactText are direct children of a flex container (GridItemContact) and become blockified flex items.
// Truncate (overflow-hidden + text-overflow) works on them automatically.

export function GridItemContactText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="max-w-full truncate text-xs font-medium text-black dark:text-white">
      {children}
    </span>
  );
}
