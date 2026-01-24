import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

interface CommentItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function CommentItemText({ className, children }: CommentItemTextProps) {
  return (
    <span
      className={twMerge(
        "text-sm font-normal text-black dark:text-white",
        className,
      )}
    >
      {children}
    </span>
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
