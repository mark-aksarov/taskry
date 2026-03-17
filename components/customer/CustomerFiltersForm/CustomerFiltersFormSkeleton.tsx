import { Separator } from "@/components/ui/Separator";
import { FieldSkeleton } from "@/components/ui/Skeleton";
import { ButtonSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { SwitchSkeleton } from "@/components/ui/Skeleton/SwitchSkeleton";
import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";

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
        <ButtonSkeleton size="medium" />
      </FormBaseFooter>
    </div>
  );
}
