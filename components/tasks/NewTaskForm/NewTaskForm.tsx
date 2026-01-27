import { TaskFormBase, TaskFormBaseProps } from "../TaskFormBase";

export function NewTaskForm(props: Omit<TaskFormBaseProps, "id">) {
  return <TaskFormBase id="new-task-form" {...props} />;
}
