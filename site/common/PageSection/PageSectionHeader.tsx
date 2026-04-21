import { twMerge } from "tailwind-merge";

interface PageSectionHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function PageSectionHeader({
  className,
  children,
}: PageSectionHeaderProps) {
  return (
    <header className={twMerge("text-center", className)}>{children}</header>
  );
}
