interface FeatureItemHeadingProps {
  children: React.ReactNode;
}

export function FeatureItemHeading({ children }: FeatureItemHeadingProps) {
  return (
    <h3 className="text-xl font-bold text-black dark:text-white">{children}</h3>
  );
}
