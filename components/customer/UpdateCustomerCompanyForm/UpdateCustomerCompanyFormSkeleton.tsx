import {
  FieldSkeleton,
  FieldGroupSkeleton,
  ButtonSkeleton,
} from "@/components/ui/Skeleton";

import { FormBaseBody, FormBaseFooter } from "@/components/common/FormBase";

export function UpdateCustomerCompanyFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
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
