export function GridItemContactText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full truncate text-xs font-medium text-(--text-primary)">
      {children}
    </div>
  );
}
