import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

export function TaskCategoryFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>
    </div>
  );
}
