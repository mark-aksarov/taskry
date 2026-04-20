import { FieldSkeleton, FieldGroupSkeleton } from "@/ui/Skeleton";

export function TaskFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>

      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>

      <FieldSkeleton>
        <FieldGroupSkeleton className="h-[9rem]" />
      </FieldSkeleton>

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
        <FieldGroupSkeleton />
      </FieldSkeleton>
    </div>
  );
}
