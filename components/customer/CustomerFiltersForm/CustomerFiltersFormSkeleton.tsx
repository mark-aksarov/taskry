import {
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButtonSkeleton,
} from "@/components/common/FormBase";
import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { SwitchSkeleton } from "@/components/common/SwitchSkeleton";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";

export function CustomerFiltersFormSkeleton() {
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
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButtonSkeleton />
      </FormBaseFooter>
    </div>
  );
}
