interface SiteCardHeadingProps {
  children: React.ReactNode;
}

export function SiteCardHeading({ children }: SiteCardHeadingProps) {
  return (
    <h3 className="text-xl font-bold text-(--text-primary)">{children}</h3>
  );
}
