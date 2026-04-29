interface DocsNavigationHeadingProps {
  children: React.ReactNode;
}

export function DocsNavigationHeading({
  children,
}: DocsNavigationHeadingProps) {
  return (
    <h3 className="text-sm font-bold text-black dark:text-white">{children}</h3>
  );
}
