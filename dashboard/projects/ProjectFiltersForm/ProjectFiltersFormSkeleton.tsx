import { FieldSkeleton, FieldGroupSkeleton } from "@/ui/Skeleton";

import { Skeleton } from "@/ui/Skeleton";
import { Separator } from "@/ui/Separator";
import { SwitchSkeleton } from "@/ui/Skeleton/SwitchSkeleton";

export function ProjectFiltersFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <SwitchSkeleton />
      <Separator />

      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>

      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>
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
