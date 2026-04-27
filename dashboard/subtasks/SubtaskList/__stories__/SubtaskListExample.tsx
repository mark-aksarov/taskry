import { SubtaskList } from "../SubtaskList";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { SubtaskListItem, SubtaskListItemVariant } from "../../SubtaskListItem";
import { MockedDeleteSubtaskProvider } from "../../DeleteSubtaskProvider/__stories__";
import { MockedUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";
import { MockedToggleSubtaskProvider } from "../../ToggleSubtaskProvider/__stories__";

const mockedSubtasks = [
  { id: 1, text: "Subtask placeholder text 1 text", isDone: false },
  { id: 2, text: "Subtask placeholder text 2 text", isDone: false },
  { id: 3, text: "Subtask placeholder text 3 text", isDone: true },
  { id: 4, text: "Subtask placeholder text 4 text", isDone: true },
  { id: 5, text: "Subtask placeholder text 5 text", isDone: true },
];

export function SubtaskListExample({
  variant,
  showActionMenu,
}: {
  variant: SubtaskListItemVariant;
  showActionMenu?: boolean;
}) {
  return (
    <SubtaskList>
      {mockedSubtasks.map((subtask) => (
        <ModalManagerProvider key={subtask.id}>
          <MockedDeleteSubtaskProvider>
            <MockedUpdateSubtaskProvider>
              <MockedToggleSubtaskProvider>
                <SubtaskListItem
                  {...subtask}
                  variant={variant}
                  showActionMenu={showActionMenu}
                />
              </MockedToggleSubtaskProvider>
            </MockedUpdateSubtaskProvider>
          </MockedDeleteSubtaskProvider>
        </ModalManagerProvider>
      ))}
    </SubtaskList>
  );
}
