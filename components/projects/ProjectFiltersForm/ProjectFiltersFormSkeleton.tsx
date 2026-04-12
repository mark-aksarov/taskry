import { FieldSkeleton, FieldGroupSkeleton } from "@/components/ui/Skeleton";

import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { SwitchSkeleton } from "@/components/ui/Skeleton/SwitchSkeleton";

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
