import "server-only";

import { Suspense } from "react";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { UserFiltersForm, UserFiltersFormSkeleton } from "./UserFiltersForm";

export function UserFiltersFormContainer() {
  return (
    <Suspense fallback={<UserFiltersFormSkeleton />}>
      <UserFiltersFormContainerInner />
    </Suspense>
  );
}

async function UserFiltersFormContainerInner() {
  const positions = await getPositionSummaries();

  return <UserFiltersForm positionCheckboxGroupItems={positions} />;
}
