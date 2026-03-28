import { PositionsPage } from "./PositionsPage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { PositionsContainer } from "@/components/position/PositionsContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreatePositionModal } from "@/components/position/CreatePositionModal";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreatePositionProvider } from "@/components/position/CreatePositionProvider";
import { DeletePositionsProvider } from "@/components/position/DeletePositionsProvider";
import { DeletePositionsModal } from "@/components/position/DeletePositionsModal";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPage();

  const positions = await getPositionSummaries();

  return (
    <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
      <DeletePositionsProvider>
        <CreatePositionProvider>
          <PositionsPage
            totalCount={positions.length}
            positionsContainer={<PositionsContainer />}
          />

          <TaskSearchModal
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
          />
          <CreatePositionModal />
          <DeletePositionsModal />
        </CreatePositionProvider>
      </DeletePositionsProvider>
    </SelectedItemsProvider>
  );
}
