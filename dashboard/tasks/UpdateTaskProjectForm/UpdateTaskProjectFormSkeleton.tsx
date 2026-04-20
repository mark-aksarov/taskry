import { FieldSkeleton, FieldGroupSkeleton } from "@/ui/Skeleton";

export function UpdateTaskProjectFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>
    </div>
  );
}
