import { twMerge } from "tailwind-merge";

interface DashboardGridProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardGrid({ className, children }: DashboardGridProps) {
  return (
    /* flex items have min-width:auto in row; min-w-0 prevents filters overflow when empty filtering results */
    <div
      className={twMerge(
        "flex min-w-0 flex-col max-md:gap-4 md:gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
