import { twMerge } from "tailwind-merge";

interface DetailCardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCardFooter({
  className,
  children,
}: DetailCardFooterProps) {
  return (
    <div
      className={twMerge(
        "border-t-1 border-gray-300 p-4 dark:border-gray-600",
        className,
      )}
    >
      {children}
    </div>
  );
}
