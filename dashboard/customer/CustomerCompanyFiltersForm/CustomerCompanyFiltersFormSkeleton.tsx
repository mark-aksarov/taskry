import { Skeleton } from "@/ui/Skeleton";
import { FieldSkeleton } from "@/ui/Skeleton";

export function CustomerCompanyFiltersFormSkeleton() {
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
