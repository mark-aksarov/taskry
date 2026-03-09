import { PositionsPage } from "./PositionsPage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { createPosition } from "@/lib/actions/position/createPosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { DeletePositionsProvider } from "@/components/position/DeletePositionsContext";
import { CreatePositionProvider } from "@/components/position/CreatePositionContext";

export default async function AppPositionsPage() {
  // Authorization
  const session = await requireProtectedPage();

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  const positions = await getPositionSummaries();

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
        <PageTransitionProvider>
          <DeletePositionsProvider deletePositions={deletePositions}>
            <CreatePositionProvider createPosition={createPosition}>
              <PositionsPage
                totalCount={positions.length}
                positionsContainer={<PositionsContainer />}
              />
            </CreatePositionProvider>
          </DeletePositionsProvider>
        </PageTransitionProvider>
      </SelectedItemsProvider>
    </CurrentUserProvider>
  );
}
