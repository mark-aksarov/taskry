import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-2xl border-1 border-(--border-secondary) bg-(--surface-primary) p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
