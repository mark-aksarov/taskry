import { twMerge } from "tailwind-merge";

interface PageSectionProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function PageSection({
  as: Component = "section",
  className,
  children,
  ...rest
}: PageSectionProps) {
  return (
    <Component
      className={twMerge(
        "border-b-1 border-gray-300 py-20 max-md:py-15 dark:border-gray-600",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
