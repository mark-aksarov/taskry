import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { UserFilters } from "@/lib/types";
import { getPositionSummaries } from "@/lib/data/position/position.service";

interface UserFiltersFormServerContainerProps {
  filters: UserFilters;
}

export async function UserFiltersFormServerContainer({
  filters,
}: UserFiltersFormServerContainerProps) {
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
