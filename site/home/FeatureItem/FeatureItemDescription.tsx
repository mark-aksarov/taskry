interface FeatureItemDescriptionProps {
  children: React.ReactNode;
}

export function FeatureItemDescription({
  children,
}: FeatureItemDescriptionProps) {
  return (
    <p className="text-base font-normal text-(--text-tertiary)">{children}</p>
  );
}
