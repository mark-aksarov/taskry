import { useCreateTaskCategory } from "@/components/taskCategory/CreateTaskCategoryContext";

export function useCreateTaskCategoryTriggerDisabled() {
  // Create task category action and modal states
  const { isPending: isCreateTaskCategoryPending } = useCreateTaskCategory();

  return isCreateTaskCategoryPending;
}
