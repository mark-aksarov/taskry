import { DateValue } from "react-aria";
import { TaskFormBase } from "../TaskFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditTaskFormProps {
  taskId: number;
  taskTitleDefaultValue?: string;
  taskDescriptionDefaultValue?: string;
  taskDeadlineDefaultValue?: DateValue;
  taskStatusSelect: React.ReactNode;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function EditTaskForm({
  taskId,
  taskTitleDefaultValue,
  taskDescriptionDefaultValue,
  taskDeadlineDefaultValue,
  taskStatusSelect,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
  formAction,
}: EditTaskFormProps) {
  return (
    <TaskFormBase
      id="edit-task-form"
      taskId={taskId}
      taskTitleDefaultValue={taskTitleDefaultValue}
      taskDescriptionDefaultValue={taskDescriptionDefaultValue}
      taskDeadlineDefaultValue={taskDeadlineDefaultValue}
      taskStatusSelect={taskStatusSelect}
      taskCategorySelect={taskCategorySelect}
      projectSelect={projectSelect}
      assigneeSelect={assigneeSelect}
      formAction={formAction}
    />
  );
}
