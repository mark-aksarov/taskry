import { PositionsPage } from "./PositionsPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { PositionsContainer } from "@/dashboard/position/PositionsContainer";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CreatePositionModal } from "@/dashboard/position/CreatePositionModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { CreatePositionProvider } from "@/dashboard/position/CreatePositionProvider";
import { DeletePositionsProvider } from "@/dashboard/position/DeletePositionsProvider";
import { DeletePositionsModal } from "@/dashboard/position/DeletePositionsModal";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPageSession();

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
