import "server-only";

import {
  UserFiltersForm,
  UserFiltersFormSkeleton,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { Suspense } from "react";
import { UserFilters } from "@/lib/types";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { UserFiltersProvider } from "../UserFiltersContext";

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
    <UserFiltersProvider initialFilters={filters}>
      <UserFiltersForm
        positionCheckboxGroup={
          <UserFiltersFormPositionCheckboxGroup positions={positions} />
        }
      />
    </UserFiltersProvider>
  );
}
