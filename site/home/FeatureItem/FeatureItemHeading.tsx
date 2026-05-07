interface FeatureItemHeadingProps {
  children: React.ReactNode;
}

export function FeatureItemHeading({ children }: FeatureItemHeadingProps) {
  return (
    <h3 className="text-xl font-bold text-(--text-primary)">{children}</h3>
  );
}
