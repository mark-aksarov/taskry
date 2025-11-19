import { twMerge } from "tailwind-merge";

interface DetailCardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCardBody({ className, children }: DetailCardBodyProps) {
  return <div className={twMerge("p-4", className)}>{children}</div>;
}
