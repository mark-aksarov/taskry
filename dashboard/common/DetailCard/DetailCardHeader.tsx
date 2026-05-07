import { twMerge } from "tailwind-merge";

interface DetailCardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCardHeader({
  className,
  children,
}: DetailCardHeaderProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between border-b-1 border-(--border-primary) p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
