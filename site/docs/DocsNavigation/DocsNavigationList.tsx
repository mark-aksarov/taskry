interface DocsNavigationListProps {
  children: React.ReactNode;
}

export function DocsNavigationList({ children }: DocsNavigationListProps) {
  return <ul className="flex flex-col gap-3">{children}</ul>;
}
