import { Skeleton } from "@/components/ui";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";

export function CustomerCheckboxGroupSkeleton() {
  return (
    <FieldSkeleton>
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </FieldSkeleton>
  );
}
