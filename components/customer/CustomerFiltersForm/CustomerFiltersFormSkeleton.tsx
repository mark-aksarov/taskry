import { Skeleton } from "@/components/ui";
import {
  FieldGroupSkeleton,
  FieldSkeleton,
} from "@/components/common/FieldSkeleton";

export function CustomerFiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>

      <FieldSkeleton>
        <Skeleton size="sm" />
        <Skeleton size="sm" />
        <Skeleton size="sm" />
      </FieldSkeleton>
    </div>
  );
}
