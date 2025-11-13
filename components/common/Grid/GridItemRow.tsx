import { twMerge } from "tailwind-merge";

export function GridItemRow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
