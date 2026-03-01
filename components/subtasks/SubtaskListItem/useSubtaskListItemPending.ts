import { useDeleteSubtaskTransition } from "../DeleteSubtaskTransitionContext";
import { useToggleSubtaskTransition } from "../ToggleSubtaskTransitionContext";
import { useUpdateSubtaskTransition } from "../UpdateSubtaskTransitionContext";

export function useSubtaskListItemPending() {
  const { isPending: isDeleteSubtaskPending } = useDeleteSubtaskTransition();
  const { isPending: isUpdateSubtaskPending } = useUpdateSubtaskTransition();
  const { isPending: isToggleSubtaskPending } = useToggleSubtaskTransition();

  const isPending =
    isDeleteSubtaskPending || isUpdateSubtaskPending || isToggleSubtaskPending;

  return isPending;
}
