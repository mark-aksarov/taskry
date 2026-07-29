import { SubtaskList } from "../SubtaskList";
import { mockedSubtaskList } from "@/mocks/subtasks";
import { DeleteSubtaskProvider } from "../../DeleteSubtaskContext";
import { UpdateSubtaskProvider } from "../../UpdateSubtaskContext";
import { ToggleSubtaskProvider } from "../../ToggleSubtaskContext";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { SubtaskListItem, SubtaskListItemVariant } from "../../SubtaskListItem";

export function SubtaskListExample({
  variant,
  showActionMenu,
}: {
  variant: SubtaskListItemVariant;
  showActionMenu?: boolean;
}) {
  return (
    <SubtaskList>
      {mockedSubtaskList.map((subtask) => (
        <ModalManagerProvider key={subtask.id}>
          <DeleteSubtaskProvider>
            <UpdateSubtaskProvider>
              <ToggleSubtaskProvider>
                <SubtaskListItem
                  {...subtask}
                  variant={variant}
                  showActionMenu={showActionMenu}
                />
              </ToggleSubtaskProvider>
            </UpdateSubtaskProvider>
          </DeleteSubtaskProvider>
        </ModalManagerProvider>
      ))}
    </SubtaskList>
  );
}
