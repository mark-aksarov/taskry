import { TaskFormBase } from "../TaskFormBase";

export function NewTaskForm({
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
