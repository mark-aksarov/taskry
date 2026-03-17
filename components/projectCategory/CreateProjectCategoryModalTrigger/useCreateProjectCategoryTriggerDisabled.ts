import { useCreateProjectCategory } from "@/components/projectCategory/CreateProjectCategoryContext";

export function useCreateProjectCategoryTriggerDisabled() {
  // Create project category action and modal states
  const { isPending: isCreateProjectCategoryPending } =
    useCreateProjectCategory();

  return isCreateProjectCategoryPending;
}
