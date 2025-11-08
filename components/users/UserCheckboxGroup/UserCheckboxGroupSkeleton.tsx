import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Skeleton } from "@/components/ui";

export function UserCheckboxGroupSkeleton() {
  return (
    <FieldSkeleton>
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </FieldSkeleton>
  );
}
