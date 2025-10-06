import { CheckboxGroupSkeleton } from "@/components/common/CheckboxGroupSkeleton";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Skeleton } from "@/components/ui";

export function ProjectFiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FieldSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <Skeleton className="h-[2.625rem] w-full rounded-lg" />
    </div>
  );
}
