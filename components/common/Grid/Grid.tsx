import { twMerge } from "tailwind-merge";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function GridLarge({ className, children, ...props }: GridProps) {
  return (
    <div className="@container" {...props}>
      <div
        className={twMerge(
          "grid gap-4 @max-3xl:grid-cols-2 @3xl:@max-5xl:grid-cols-3 @5xl:@max-7xl:grid-cols-4 @7xl:grid-cols-5",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function GridMobile({ className, children, ...props }: GridProps) {
  return (
    <div className="@container" {...props}>
      <div className={twMerge("grid grid-cols-1 gap-4", className)}>
        {children}
      </div>
    </div>
  );
}
