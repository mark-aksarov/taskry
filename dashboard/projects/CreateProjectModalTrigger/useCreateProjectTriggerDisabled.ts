import { useCreateProject } from "@/dashboard/projects/CreateProjectContext";

export function useCreateProjectTriggerDisabled() {
  // Create task action and modal states
  const { isPending: isCreateProjectPending } = useCreateProject();

  return isCreateProjectPending;
}
