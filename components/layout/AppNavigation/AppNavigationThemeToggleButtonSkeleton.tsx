import { Skeleton } from "@/components/ui/Skeleton";

export function AppNavigationThemeToggleButtonSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="h-4 w-4 rounded-md" />
      <Skeleton size="sm" className="w-[5rem]" />
    </div>
  );
}
