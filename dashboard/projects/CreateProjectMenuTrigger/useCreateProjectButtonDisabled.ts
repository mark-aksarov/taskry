import { useCreateProject } from "../CreateProjectContext";
import { useCreateProjectCategory } from "@/dashboard/projectCategory/CreateProjectCategoryContext";

export function useCreateProjectButtonDisabled() {
  // Block user interactions while a project category or project is being created
  const { isPending: isCreateProjectCategoryPending } =
    useCreateProjectCategory();
  const { isPending: isCreateProjectPending } = useCreateProject();

  return isCreateProjectPending || isCreateProjectCategoryPending;
}
