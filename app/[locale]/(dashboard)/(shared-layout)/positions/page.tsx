import { PositionsPage } from "./PositionsPage";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreatePositionProvider } from "@/components/position/CreatePositionProvider";
import { CreatePositionModalProvider } from "@/components/position/CreatePositionModal";
import { DeletePositionsProvider } from "@/components/position/DeletePositionsProvider";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  const positions = await getPositionSummaries();

  return (
    <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
      <DeletePositionsProvider>
        <CreatePositionModalProvider>
          <CreatePositionProvider>
            <PositionsPage
              totalCount={positions.length}
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
              positionsContainer={<PositionsContainer />}
            />
          </CreatePositionProvider>
        </CreatePositionModalProvider>
      </DeletePositionsProvider>
    </SelectedItemsProvider>
  );
}
