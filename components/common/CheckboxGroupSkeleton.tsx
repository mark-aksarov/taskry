import { fieldStyles } from "../ui/Field";
import { Skeleton } from "../ui/Skeleton";

export function CheckboxGroupSkeleton() {
  return (
    <div className={fieldStyles()}>
      <Skeleton size="xs" className="w-[4rem]" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </div>
  );
}
