import { twMerge } from "tailwind-merge";

interface PageSectionContentProps {
  className?: string;
  children: React.ReactNode;
}

export function PageSectionContent({
  className,
  children,
}: PageSectionContentProps) {
  return (
    <div className={twMerge("flex flex-col gap-10", className)}>{children}</div>
  );
}
