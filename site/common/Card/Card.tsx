import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-2xl border-1 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
