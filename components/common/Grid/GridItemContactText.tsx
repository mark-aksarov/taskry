export function GridItemContactText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="-m-1 max-w-full overflow-hidden p-1 text-xs font-medium text-nowrap overflow-ellipsis text-black dark:text-white">
      {children}
    </span>
  );
}
