import { useDeleteTaskCategories } from "../DeleteTaskCategoriesContext";
import { useDeleteTaskCategoryTransition } from "../DeleteTaskCategoryTransitionContext";
import { useUpdateTaskCategoryTransition } from "../UpdateTaskCategoryTransitionContext";

export function useTaskCategoryListItemPending(taskCategoryId: number) {
  const { isPending: isDeleteTaskCategoryPending } =
    useDeleteTaskCategoryTransition();
  const { isPending: isUpdateTaskCategoryPending } =
    useUpdateTaskCategoryTransition();
  const { isPending: isDeleteTaskCategoriesPending, taskCategoryIds } =
    useDeleteTaskCategories();

  const isPending =
    isDeleteTaskCategoryPending ||
    isUpdateTaskCategoryPending ||
    (isDeleteTaskCategoriesPending && taskCategoryIds.includes(taskCategoryId));

  return isPending;
}
