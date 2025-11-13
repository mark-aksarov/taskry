export function GridItemContactText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="-m-1 max-w-full truncate p-1 text-xs font-medium text-black dark:text-white">
      {children}
    </span>
  );
}
