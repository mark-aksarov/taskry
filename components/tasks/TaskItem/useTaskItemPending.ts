import { useDeleteTasks } from "../DeleteTasksContext";
import { useDeleteTaskTransition } from "../DeleteTaskTransitionContext";
import { useUpdateTaskTransition } from "../UpdateTaskTransitionContext";

export function useTaskItemPending(taskId: number) {
  const { isPending: isDeleteTaskPending } = useDeleteTaskTransition();
  const { isPending: isDeleteTasksPending, taskIds } = useDeleteTasks();
  const { isPending: isUpdateTaskPending } = useUpdateTaskTransition();

  const isPending =
    isDeleteTaskPending ||
    isUpdateTaskPending ||
    (isDeleteTasksPending && taskIds.includes(taskId));

  return isPending;
}
