import { twMerge } from "tailwind-merge";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function Grid({ className, children, ...props }: GridProps) {
  return (
    <div className="@container" {...props}>
      <div
        className={twMerge(
          "grid gap-4 @max-3xl:grid-cols-2 @max-md:grid-cols-1 @3xl:@max-5xl:grid-cols-3 @5xl:@max-7xl:grid-cols-4 @7xl:grid-cols-5",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
