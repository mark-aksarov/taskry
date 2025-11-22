import { twMerge } from "tailwind-merge";

interface UserCardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function UserCardHeader({ className, children }: UserCardHeaderProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between border-b-1 border-gray-300 p-6 dark:border-gray-600",
        className,
      )}
    >
      {children}
    </div>
  );
}
