import {
  TaskCategoryFormBase,
  TaskCategoryFormBaseProps,
} from "./TaskCategoryFormBase";

export function NewTaskCategoryForm(
  props: Omit<TaskCategoryFormBaseProps, "id">,
) {
  return <TaskCategoryFormBase id="new-task-category-form" {...props} />;
}
