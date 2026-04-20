import { useCreateTask } from "../CreateTaskContext";
import { useCreateTaskCategory } from "@/dashboard/taskCategory/CreateTaskCategoryContext";

export function useCreateTaskMenuTriggerDisabled() {
  // Block user interactions while a task category or task is being created
  const { isPending: isCreateTaskCategoryPending } = useCreateTaskCategory();
  const { isPending: isCreateTaskPending } = useCreateTask();

  return isCreateTaskPending || isCreateTaskCategoryPending;
}
