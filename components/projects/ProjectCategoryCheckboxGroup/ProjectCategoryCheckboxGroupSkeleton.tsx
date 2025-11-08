import { Skeleton } from "@/components/ui";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";

export function ProjectCategoryCheckboxGroupSkeleton() {
  return (
    <FieldSkeleton>
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </FieldSkeleton>
  );
}
