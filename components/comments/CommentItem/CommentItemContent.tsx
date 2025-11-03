import { twMerge } from "tailwind-merge";

export function CommentItemContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={twMerge("ml-12 flex flex-col gap-4", className)}>
      {children}
    </span>
  );
}
