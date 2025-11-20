import { twMerge } from "tailwind-merge";

interface DetailCardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCardBody({ className, children }: DetailCardBodyProps) {
  return (
    <div className={twMerge("flex max-lg:p-4 lg:p-5", className)}>
      {children}
    </div>
  );
}
