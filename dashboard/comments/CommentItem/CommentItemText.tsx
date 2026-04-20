import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/ui/Skeleton";

interface CommentItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function CommentItemText({ className, children }: CommentItemTextProps) {
  return (
    <div
      className={twMerge(
        "text-sm font-normal text-black dark:text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CommentItemTextSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge("flex flex-col", className)}>
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </div>
  );
}
