import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

import { getPositionSummaries } from "@/lib/dal/positions";

export async function UserFiltersFormServerContainer() {
  const positions = await getPositionSummaries();

  return (
    <UserFiltersForm
      positionCheckboxGroup={
        <UserFiltersFormPositionCheckboxGroup positions={positions} />
      }
    />
  );
}
