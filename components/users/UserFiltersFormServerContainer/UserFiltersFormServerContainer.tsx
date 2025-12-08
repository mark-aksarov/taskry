import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";
import { getPositionSummaries } from "@/lib/queries/posititons";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function UserFiltersFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const positions = await getPositionSummaries(workspaceId);

  return (
    <UserFiltersForm
      positionCheckboxGroup={
        <UserFiltersFormPositionCheckboxGroup positions={positions} />
      }
    />
  );
}
