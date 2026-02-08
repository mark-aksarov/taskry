import {
  FieldSkeleton,
  FieldGroupSkeleton,
} from "@/components/common/FieldSkeleton";

import {
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButtonSkeleton,
} from "../common/FormBase";

import { Skeleton } from "@/components/ui/Skeleton";

export function TaskFormSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <FormBaseBody>
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
