import { twMerge } from "tailwind-merge";

interface PageGridProps {
  className?: string;
  cols?: number;
  children: React.ReactNode;
}

export function PageGrid({ className, children }: PageGridProps) {
  return (
    /* flex items have min-width:auto in row; min-w-0 prevents filters overflow */
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
