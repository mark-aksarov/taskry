import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";
import { ButtonSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { FieldSkeleton } from "@/components/ui/Skeleton";

export function TaskProjectFiltersFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
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
