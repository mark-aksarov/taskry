import { twMerge } from "tailwind-merge";

interface DetailCardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCardTitle({ className, children }: DetailCardTitleProps) {
  return (
    <h2
      className={twMerge(
        "text-lg font-extrabold text-(--text-primary)",
        className,
      )}
    >
      {children}
    </h2>
  );
}
