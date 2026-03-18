import { useCreateTask } from "@/components/tasks/CreateTaskContext";

export function useCreateTaskTriggerDisabled() {
  // Create task action and modal states
  const { isPending: isCreateTaskPending } = useCreateTask();

  return isCreateTaskPending;
}
