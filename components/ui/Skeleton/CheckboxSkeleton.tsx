import { twMerge } from "tailwind-merge";
import { Skeleton } from "./Skeleton";

export function CheckboxSkeleton({ className }: { className?: string }) {
  return <Skeleton className={twMerge("flex h-5 w-5 rounded-sm", className)} />;
}
