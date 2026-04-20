import "server-only";

import {
  UserPositionFiltersForm,
  UserPositionFiltersFormSkeleton,
} from "./UserPositionFiltersForm";

import { Suspense } from "react";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

export function UserPositionFiltersFormContainer() {
  return (
    <Suspense fallback={<UserPositionFiltersFormSkeleton />}>
      <UserPositionFiltersFormContainerInner />
    </Suspense>
  );
}

async function UserPositionFiltersFormContainerInner() {
  const positions = await getPositionSummaries();

  return <UserPositionFiltersForm positionCheckboxGroupItems={positions} />;
}
