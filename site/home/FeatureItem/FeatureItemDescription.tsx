interface FeatureItemDescriptionProps {
  children: React.ReactNode;
}

export function FeatureItemDescription({
  children,
}: FeatureItemDescriptionProps) {
  return (
    <p className="text-base font-normal text-gray-600 dark:text-gray-300">
      {children}
    </p>
  );
}
