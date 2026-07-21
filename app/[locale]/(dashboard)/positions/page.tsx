import { PositionsPage } from "./PositionsPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { getPositionSummaries } from "@/lib/data/position/position.dal";
import { PositionsContainer } from "@/dashboard/position/PositionsContainer";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CreatePositionModal } from "@/dashboard/position/CreatePositionModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeletePositionsModal } from "@/dashboard/position/DeletePositionsModal";
import { ImportPositionsModal } from "@/dashboard/position/ImportPositionsModal";
import { CreatePositionProvider } from "@/dashboard/position/CreatePositionProvider";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { DeletePositionsProvider } from "@/dashboard/position/DeletePositionsProvider";
import { ImportPositionsProvider } from "@/dashboard/position/ImportPositionsProvider";

export default async function AppPositionsPage() {
  // Authorization
  await requireProtectedPageSession();

  const positions = await getPositionSummaries();

  return (
    <SelectedItemsProvider pageItems={positions.map((p) => ({ id: p.id }))}>
      <DeletePositionsProvider>
        <CreatePositionProvider>
          <ImportPositionsProvider>
            <PositionsPage
              totalCount={positions.length}
              positionsContainer={<PositionsContainer />}
            />

            <TaskSearchModal
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
            />
            <CreatePositionModal />
            <DeletePositionsModal />
            <ImportPositionsModal />
          </ImportPositionsProvider>
        </CreatePositionProvider>
      </DeletePositionsProvider>
    </SelectedItemsProvider>
  );
}
