import { TaskFormBase } from "../TaskFormBase";
import { TaskFormBaseProps } from "../TaskFormBase/TaskFormBase";

export function NewTaskForm(props: Omit<TaskFormBaseProps, "id">) {
  return <TaskFormBase id="new-task-form" {...props} />;
}
