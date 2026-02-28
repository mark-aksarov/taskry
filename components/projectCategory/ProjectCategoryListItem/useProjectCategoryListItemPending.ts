import { useDeleteProjectCategories } from "../DeleteProjectCategoriesContext";
import { useDeleteProjectCategoryTransition } from "../DeleteProjectCategoryTransitionContext";
import { useUpdateProjectCategoryTransition } from "../UpdateProjectCategoryTransitionContext";

export function useProjectCategoryListItemPending(projectCategoryId: number) {
  const { isPending: isDeleteProjectCategoryPending } =
    useDeleteProjectCategoryTransition();
  const { isPending: isUpdateProjectCategoryPending } =
    useUpdateProjectCategoryTransition();
  const { isPending: isDeleteProjectCategoriesPending, projectCategoryIds } =
    useDeleteProjectCategories();

  const isPending =
    isDeleteProjectCategoryPending ||
    isUpdateProjectCategoryPending ||
    (isDeleteProjectCategoriesPending &&
      projectCategoryIds.includes(projectCategoryId));

  return isPending;
}
