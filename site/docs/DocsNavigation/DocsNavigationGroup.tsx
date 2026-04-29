interface DocsNavigationGroupProps {
  title: React.ReactNode;
  links: React.ReactNode;
}

export function DocsNavigationGroup({
  title,
  links,
}: DocsNavigationGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <>{title}</>
      <>{links}</>
    </div>
  );
}
