import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

import {
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButtonSkeleton,
} from "@/components/common/FormBase";

import { Skeleton } from "@/components/ui/Skeleton";

export function UserFiltersFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>

        <FieldSkeleton>
          <Skeleton size="sm" />
          <Skeleton size="sm" />
          <Skeleton size="sm" />
        </FieldSkeleton>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButtonSkeleton />
      </FormBaseFooter>
    </div>
  );
}
