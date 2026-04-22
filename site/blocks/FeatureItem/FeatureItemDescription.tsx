interface FeatureItemDescriptionProps {
  children: React.ReactNode;
}

export function FeatureItemDescription({
  children,
}: FeatureItemDescriptionProps) {
  return (
    <p className="text-base font-normal text-slate-600 dark:text-slate-300">
      {children}
    </p>
  );
}
