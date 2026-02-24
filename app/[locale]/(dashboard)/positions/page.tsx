import {
  getPositionCount,
  getPositionSummaries,
} from "@/lib/data/position/position.dal";

import { PositionsPage } from "./PositionsPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const positionCount = await getPositionCount();
  const guestMode = await hasGuestRole();

  if (!positionCount) {
    return (
      <PositionsPageEmpty
        guestMode={guestMode}
        createPosition={createPosition}
      />
    );
  }

  const positions = await getPositionSummaries();

  return (
    <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
      <PageTransitionProvider>
        <PositionsPage
          guestMode={guestMode}
          createPosition={createPosition}
          positionsContainer={<PositionsContainer />}
          deletePositions={deletePositions}
        />
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
