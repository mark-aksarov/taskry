interface FeatureItemIconWrapperProps {
  children: React.ReactNode;
}

export function FeatureItemIconWrapper({
  children,
}: FeatureItemIconWrapperProps) {
  return (
    <div className="rounded-md bg-blue-100 p-3 text-blue-500 dark:bg-blue-700 dark:text-white">
      {children}
    </div>
  );
}
