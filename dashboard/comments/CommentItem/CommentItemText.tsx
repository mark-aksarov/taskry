import { twMerge } from "tailwind-merge";

interface CommentItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function CommentItemText({ className, children }: CommentItemTextProps) {
  return (
    <div
      className={twMerge(
        "text-sm font-normal text-(--text-primary)",
        className,
      )}
    >
      {children}
    </div>
  );
}
