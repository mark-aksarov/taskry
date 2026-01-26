import "server-only";

import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { UserFilters } from "@/lib/types";
import { getPositionSummaries } from "@/lib/data/position/position.service";

interface UserFiltersFormContainerProps {
  filters: UserFilters;
}

export async function UserFiltersFormContainer({
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
