import { twMerge } from "tailwind-merge";

interface ListProps {
  className?: string;
  children: React.ReactNode;
}

export function List({ className, children }: ListProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>{children}</div>
  );
}
