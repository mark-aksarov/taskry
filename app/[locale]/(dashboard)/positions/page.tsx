import { PositionsPage } from "./PositionsPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { getPositionCount } from "@/lib/data/position/position.dal";
import { createPosition } from "@/lib/actions/position/createPosition";
import { NewPositionForm } from "@/components/position/NewPositionForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { PositionToolbarCreateNewButton } from "@/components/position/PositionToolbarCreateNewButton";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const positionCount = await getPositionCount();
  const guestMode = await hasGuestRole();

  const positionToolbarCreateNewButton = (
    <PositionToolbarCreateNewButton
      guestMode={guestMode}
      newPositionForm={<NewPositionForm createPosition={createPosition} />}
    />
  );

  if (!positionCount) {
    return (
      <PositionsPageEmpty
        positionToolbarCreateNewButton={positionToolbarCreateNewButton}
      />
    );
  }

  return (
    <PositionsPage
      positionsContainer={<PositionsContainer />}
      positionToolbarCreateNewButton={positionToolbarCreateNewButton}
      positionToolbarActionsMenuTrigger={
        <PositionToolbarActionsMenuTrigger
          guestMode={guestMode}
          deletePositions={deletePositions}
        />
      }
    />
  );
}
