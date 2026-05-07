interface DocsNavigationListProps {
  children: React.ReactNode;
}

export function DocsNavigationList({ children }: DocsNavigationListProps) {
  return (
    <ul className="flex flex-col gap-1 border-l-1 border-(--border-primary)">
      {children}
    </ul>
  );
}
