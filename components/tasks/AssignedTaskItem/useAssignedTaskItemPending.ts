import { useDeleteTask } from "../DeleteTaskContext";
import { useUpdateTask } from "../UpdateTaskContext";

export function useAssignedTaskItemPending() {
  const { isPending: isDeleteTaskPending } = useDeleteTask();
  const { isPending: isUpdateTaskPending } = useUpdateTask();

  const isPending = isDeleteTaskPending || isUpdateTaskPending;

  return isPending;
}
