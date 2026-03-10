import { PositionsPage } from "./PositionsPage";
import { createPosition } from "@/lib/actions/position/createPosition";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { DeletePositionsProvider } from "@/components/position/DeletePositionsContext";
import { CreatePositionProvider } from "@/components/position/CreatePositionContext";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  const positions = await getPositionSummaries();

  return (
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
  );
}
