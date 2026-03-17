import { FormBaseBody, FormBaseFooter } from "../common/FormBase";

import {
  FieldSkeleton,
  FieldGroupSkeleton,
  ButtonSkeleton,
} from "@/components/ui/Skeleton";

export function CustomerFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>

        <FieldSkeleton>
          <FieldGroupSkeleton className="h-[9rem]" />
        </FieldSkeleton>

        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>

        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>

        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>

        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>
      </FormBaseBody>

      <FormBaseFooter>
        <ButtonSkeleton size="medium" />
      </FormBaseFooter>
    </div>
  );
}
