import { Skeleton } from "@/ui/Skeleton";
import { Separator } from "@/ui/Separator";
import { FieldSkeleton } from "@/ui/Skeleton";
import { SwitchSkeleton } from "@/ui/Skeleton/SwitchSkeleton";

export function UserFiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <SwitchSkeleton />
      <Separator />

      <SwitchSkeleton />
      <Separator />

      <SwitchSkeleton />
      <Separator />

      <FieldSkeleton>
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
      </FieldSkeleton>
      <Separator />

      <FieldSkeleton>
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
        <Skeleton size="sm" className="w-[7rem]" />
      </FieldSkeleton>
    </div>
  );
}
