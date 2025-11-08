import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Skeleton } from "@/components/ui";

export function PositionCheckboxGroupSkeleton() {
  return (
    <FieldSkeleton>
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </FieldSkeleton>
  );
}
