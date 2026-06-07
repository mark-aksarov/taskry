interface SiteCardDescriptionProps {
  children: React.ReactNode;
}

export function SiteCardDescription({ children }: SiteCardDescriptionProps) {
  return (
    <p className="text-base font-normal text-(--text-tertiary)">{children}</p>
  );
}
