import { TaskFormBase } from "../TaskFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

export function NewTaskForm({
  taskStatusSelect,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
  formAction,
}: {
  taskStatusSelect: React.ReactNode;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}) {
  return (
    <TaskFormBase
      id="new-task-form"
      taskStatusSelect={taskStatusSelect}
      taskCategorySelect={taskCategorySelect}
      projectSelect={projectSelect}
      assigneeSelect={assigneeSelect}
      formAction={formAction}
    />
  );
}
