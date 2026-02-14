import { PositionsPage } from "./PositionsPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { getPositionCount } from "@/lib/data/position/position.dal";
import { createPosition } from "@/lib/actions/position/createPosition";
import { NewPositionForm } from "@/components/position/NewPositionForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const positionCount = await getPositionCount();
  const guestMode = await hasGuestRole();

  const positionToolbarCreateNewModalTrigger = (
    <PositionToolbarCreateNewModalTrigger
      guestMode={guestMode}
      newPositionForm={<NewPositionForm createPosition={createPosition} />}
    />
  );

  if (!positionCount) {
    return (
      <PositionsPageEmpty
        positionToolbarCreateNewModalTrigger={
          positionToolbarCreateNewModalTrigger
        }
      />
    );
  }

  return (
    <PositionsPage
      positionsContainer={<PositionsContainer />}
      positionToolbarCreateNewModalTrigger={
        positionToolbarCreateNewModalTrigger
      }
      positionToolbarActionsMenuTrigger={
        <PositionToolbarActionsMenuTrigger
          guestMode={guestMode}
          deletePositions={deletePositions}
        />
      }
    />
  );
}
