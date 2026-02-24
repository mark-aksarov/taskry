import "server-only";

import { Suspense } from "react";
import { UserFilters } from "@/lib/types";
import { UserFiltersProvider } from "./UserFiltersContext";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { UserFiltersForm, UserFiltersFormSkeleton } from "./UserFiltersForm";

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
      <UserFiltersForm positionCheckboxGroupItems={positions} />
    </UserFiltersProvider>
  );
}
