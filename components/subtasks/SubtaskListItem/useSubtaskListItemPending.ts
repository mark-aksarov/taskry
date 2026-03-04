import { useDeleteSubtask } from "../DeleteSubtaskContext";
import { useToggleSubtask } from "../ToggleSubtaskContext";
import { useUpdateSubtask } from "../UpdateSubtaskContext";

export function useSubtaskListItemPending() {
  const { isPending: isDeleteSubtaskPending } = useDeleteSubtask();
  const { isPending: isUpdateSubtaskPending } = useUpdateSubtask();
  const { isPending: isToggleSubtaskPending } = useToggleSubtask();

  const isPending =
    isDeleteSubtaskPending || isUpdateSubtaskPending || isToggleSubtaskPending;

  return isPending;
}
