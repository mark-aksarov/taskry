import { useCreateTaskCategory } from "@/dashboard/taskCategory/CreateTaskCategoryContext";

export function useCreateTaskCategoryTriggerDisabled() {
  // Create task category action and modal states
  const { isPending: isCreateTaskCategoryPending } = useCreateTaskCategory();

  return isCreateTaskCategoryPending;
}
