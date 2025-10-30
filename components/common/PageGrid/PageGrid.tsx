import { twMerge } from "tailwind-merge";

interface PageGridProps {
  className?: string;
  children: React.ReactNode;
}

export function PageGrid({ className, children }: PageGridProps) {
  return (
    <div className={twMerge("flex flex-col max-md:gap-4 md:gap-6", className)}>
      {children}
    </div>
  );
}
