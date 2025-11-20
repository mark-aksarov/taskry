import { twMerge } from "tailwind-merge";

interface DetailFormLabelProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailFormLabel({ className, children }: DetailFormLabelProps) {
  return (
    <span className={twMerge("flex items-center gap-2.5", className)}>
      {children}
    </span>
  );
}
