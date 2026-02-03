import "server-only";

import {
  UserFiltersForm,
  UserFiltersFormSkeleton,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { Suspense } from "react";
import { UserFilters } from "@/lib/types";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

interface UserFiltersFormContainerProps {
  filters?: UserFilters;
}

export function UserFiltersFormContainer(props: UserFiltersFormContainerProps) {
  return (
    <Suspense fallback={<UserFiltersFormSkeleton />}>
      <UserFiltersFormContainerInner {...props} />
    </Suspense>
  );
}

async function UserFiltersFormContainerInner({
  filters,
}: UserFiltersFormContainerProps) {
  const positions = await getPositionSummaries();

  return (
    <UserFiltersForm
      filters={filters}
      positionCheckboxGroup={
        <UserFiltersFormPositionCheckboxGroup
          filters={filters}
          positions={positions}
        />
      }
    />
  );
}
