import { FieldGroupSkeleton, FieldSkeleton } from "../FieldSkeleton";

export function DetailFormFieldSkeleton() {
  return (
    <FieldSkeleton className="flex-row items-center">
      <FieldGroupSkeleton className="py-3" />
    </FieldSkeleton>
  );
}
