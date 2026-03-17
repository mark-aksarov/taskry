import { Skeleton } from "./Skeleton";

export function SwitchSkeleton() {
  return (
    <div className="flex h-[1.5rem] items-center">
      <Skeleton size="sm" className="w-[7rem]" />
    </div>
  );
}
