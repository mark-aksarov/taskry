import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { UserFilters } from "@/lib/data/user/user.dto";
import { getPositionSummaries } from "@/lib/data/position/position.dal";

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
