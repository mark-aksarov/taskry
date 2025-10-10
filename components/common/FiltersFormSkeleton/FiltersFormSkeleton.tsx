import { Skeleton } from "@/components/ui";
import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

export function FiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>
        <FieldSkeleton>
          <Skeleton size="sm" />
          <Skeleton size="sm" />
          <Skeleton size="sm" />
        </FieldSkeleton>
        <FieldSkeleton>
          <Skeleton size="sm" />
          <Skeleton size="sm" />
          <Skeleton size="sm" />
        </FieldSkeleton>
      </div>
      <Skeleton className="h-[2.625rem] w-full rounded-lg" />
    </div>
  );
}
