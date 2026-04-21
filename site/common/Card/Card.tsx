import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border-1 border-gray-300 p-6 dark:border-gray-600",
        className,
      )}
    >
      {children}
    </div>
  );
}
