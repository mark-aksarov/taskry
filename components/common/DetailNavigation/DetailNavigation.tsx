import { twMerge } from "tailwind-merge";

interface DetailNavigationProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailNavigation({
  className,
  children,
}: DetailNavigationProps) {
  return (
    <nav className={twMerge("flex flex-col gap-2.5", className)}>
      {children}
    </nav>
  );
}
