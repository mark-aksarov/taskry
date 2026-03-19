import { FieldSkeleton } from "@/components/ui/Skeleton";
import { ButtonSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";

export function CompanyFiltersFormSkeleton() {
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
