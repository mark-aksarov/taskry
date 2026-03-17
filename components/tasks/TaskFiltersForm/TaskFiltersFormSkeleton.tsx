import {
  FieldSkeleton,
  FieldGroupSkeleton,
  ButtonSkeleton,
} from "@/components/ui/Skeleton";

import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { SwitchSkeleton } from "@/components/ui/Skeleton/SwitchSkeleton";
import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";

export function TaskFiltersFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
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
      </FormBaseBody>
      <FormBaseFooter>
        <ButtonSkeleton size="medium" />
      </FormBaseFooter>
    </div>
  );
}
