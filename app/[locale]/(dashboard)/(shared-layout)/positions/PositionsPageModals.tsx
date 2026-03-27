import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreatePositionModal } from "@/components/position/CreatePositionModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";

export function PositionsPageModals() {
  return (
    <>
      <TaskSearchModal
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
      />
      <CreatePositionModal />
    </>
  );
}
