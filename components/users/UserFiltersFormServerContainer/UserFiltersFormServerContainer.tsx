import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";
import { getPositionSummaries } from "@/lib/queries/posititons";

export async function UserFiltersFormServerContainer() {
  const positions = await getPositionSummaries(1);

  return (
    <UserFiltersForm
      positionCheckboxGroup={
        <UserFiltersFormPositionCheckboxGroup positions={positions} />
      }
    />
  );
}
