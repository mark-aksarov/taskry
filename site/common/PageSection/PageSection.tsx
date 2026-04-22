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
    <Component className={twMerge("py-15 max-md:py-8", className)} {...rest}>
      {children}
    </Component>
  );
}
