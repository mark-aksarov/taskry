import { twMerge } from "tailwind-merge";

interface DetailRowProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailRow({ className, children }: DetailRowProps) {
  return (
    <div className={twMerge("flex max-md:flex-col max-md:gap-4", className)}>
      {children}
    </div>
  );
}
