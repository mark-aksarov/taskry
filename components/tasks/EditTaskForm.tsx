import { TaskFormBase, TaskFormBaseProps } from "./TaskFormBase";

export function EditTaskForm(props: Omit<TaskFormBaseProps, "id">) {
  return <TaskFormBase id="edit-task-form" {...props} />;
}
