import { FieldSkeleton, ButtonSkeleton } from "@/components/ui/Skeleton";
import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";

import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { SwitchSkeleton } from "@/components/ui/Skeleton/SwitchSkeleton";

export function UserFiltersFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
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
      </FormBaseBody>
      <FormBaseFooter>
        <ButtonSkeleton size="medium" />
      </FormBaseFooter>
    </div>
  );
}
