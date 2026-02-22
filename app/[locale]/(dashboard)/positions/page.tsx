import {
  getPositionCount,
  getPositionSummaries,
} from "@/lib/data/position/position.dal";

import { PositionsPage } from "./PositionsPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { createPosition } from "@/lib/actions/position/createPosition";
import { NewPositionForm } from "@/components/position/NewPositionForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";

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

  const positions = await getPositionSummaries();

  return (
    <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
      <PageTransitionProvider>
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
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
