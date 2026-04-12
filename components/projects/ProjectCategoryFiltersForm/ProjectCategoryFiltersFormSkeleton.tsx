import { Skeleton } from "@/components/ui/Skeleton";
import { FieldSkeleton } from "@/components/ui/Skeleton";

export function ProjectCategoryFiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
      </FieldSkeleton>
    </div>
  );
}
