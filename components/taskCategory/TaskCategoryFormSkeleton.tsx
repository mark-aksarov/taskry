import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

import {
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButtonSkeleton,
} from "../common/FormBase";

export function TaskCategoryFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
        <FieldSkeleton>
          <FieldGroupSkeleton />
        </FieldSkeleton>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButtonSkeleton />
      </FormBaseFooter>
    </div>
  );
}
