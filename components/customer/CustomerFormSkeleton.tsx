import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

export function CustomerFormSkeleton() {
  return (
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
