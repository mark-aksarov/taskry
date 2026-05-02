interface DocsCardGridProps {
  children: React.ReactNode;
}

export function DocsCardGrid({ children }: DocsCardGridProps) {
  return (
    <div className="mb-10 grid gap-4 max-md:grid-cols-1 md:grid-cols-2">
      {children}
    </div>
  );
}
