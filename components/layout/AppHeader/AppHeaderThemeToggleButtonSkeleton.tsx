import { Skeleton } from "@/components/ui/Skeleton";

export function AppHeaderThemeToggleButtonSkeleton() {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <Skeleton className="h-4 w-4 rounded-md" />
    </div>
  );
}
