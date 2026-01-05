import { twMerge } from "tailwind-merge";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function List({ className, children, ...props }: ListProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}
