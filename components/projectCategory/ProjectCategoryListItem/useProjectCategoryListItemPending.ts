import { useDeleteProjectCategories } from "../DeleteProjectCategoriesContext";
import { useDeleteProjectCategory } from "../DeleteProjectCategoryContext";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";

export function useProjectCategoryListItemPending(projectCategoryId: number) {
  const { isPending: isDeleteProjectCategoryPending } =
    useDeleteProjectCategory();
  const { isPending: isUpdateProjectCategoryPending } =
    useUpdateProjectCategory();
  const {
    isPending: isDeleteProjectCategoriesPending,
    ids: projectCategoryIds,
  } = useDeleteProjectCategories();

  const isPending =
    isDeleteProjectCategoryPending ||
    isUpdateProjectCategoryPending ||
    (isDeleteProjectCategoriesPending &&
      projectCategoryIds.includes(projectCategoryId));

  return isPending;
}
