import { Skeleton } from "@/components/ui/Skeleton";

export function SearchListItemSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-4 pr-5 pl-6">
      <Skeleton className="w-[10rem]" size="sm" />
      <Skeleton className="w-[7rem]" size="xs" />
    </div>
  );
}
