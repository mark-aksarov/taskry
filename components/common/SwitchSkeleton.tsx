import { Skeleton } from "../ui/Skeleton";

export function SwitchSkeleton() {
  return (
    <div className="flex h-6 items-center">
      <Skeleton size="sm" className="w-[7rem]" />
    </div>
  );
}
