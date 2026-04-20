import { useDeleteTaskCategories } from "../DeleteTaskCategoriesContext";
import { useDeleteTaskCategory } from "../DeleteTaskCategoryContext";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";

export function useTaskCategoryListItemPending(taskCategoryId: number) {
  const { isPending: isDeleteTaskCategoryPending } = useDeleteTaskCategory();
  const { isPending: isUpdateTaskCategoryPending } = useUpdateTaskCategory();
  const { isPending: isDeleteTaskCategoriesPending, ids: taskCategoryIds } =
    useDeleteTaskCategories();

  const isPending =
    isDeleteTaskCategoryPending ||
    isUpdateTaskCategoryPending ||
    (isDeleteTaskCategoriesPending && taskCategoryIds.includes(taskCategoryId));

  return isPending;
}
