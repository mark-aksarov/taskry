import { useDeleteTasks } from "../DeleteTasksContext";
import { useDeleteTask } from "../DeleteTaskContext";
import { useUpdateTask } from "../UpdateTaskContext";

export function useTaskItemPending(taskId: number) {
  const { isPending: isDeleteTaskPending } = useDeleteTask();
  const { isPending: isDeleteTasksPending, ids: taskIds } = useDeleteTasks();
  const { isPending: isUpdateTaskPending } = useUpdateTask();

  const isPending =
    isDeleteTaskPending ||
    isUpdateTaskPending ||
    (isDeleteTasksPending && taskIds.includes(taskId));

  return isPending;
}
