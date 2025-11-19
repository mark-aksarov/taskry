import { TaskFormBase } from "../TaskFormBase";

export function EditTaskForm({
  taskStatusSelect,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
}: {
  taskStatusSelect: React.ReactNode;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
}) {
  return (
    <TaskFormBase
      taskStatusSelect={taskStatusSelect}
      taskCategorySelect={taskCategorySelect}
      projectSelect={projectSelect}
      assigneeSelect={assigneeSelect}
    />
  );
}
