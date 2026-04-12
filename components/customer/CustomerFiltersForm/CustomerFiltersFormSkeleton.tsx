import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { FieldSkeleton } from "@/components/ui/Skeleton";
import { SwitchSkeleton } from "@/components/ui/Skeleton/SwitchSkeleton";

export function CustomerFiltersFormSkeleton() {
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
    </div>
  );
}
