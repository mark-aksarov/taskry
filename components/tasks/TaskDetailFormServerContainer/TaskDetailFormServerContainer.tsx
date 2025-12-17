import { getUserSummaries } from "@/lib/dal/user";
import { getProjectSummaries } from "@/lib/dal/project";
import { TaskDetailForm } from "../TaskDetailForm/TaskDetailForm";
import { TaskDetailFormStatusSelect } from "../TaskDetailForm/TaskDetailFormStatusSelect";
import { TaskDetailFormProjectSelect } from "../TaskDetailForm/TaskDetailFormProjectSelect";
import { TaskDetailFormAssigneeSelect } from "../TaskDetailForm/TaskDetailFormAssigneeSelect";

export async function TaskDetailFormServerContainer() {
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <TaskDetailForm
      taskStatusSelect={<TaskDetailFormStatusSelect />}
      projectSelect={<TaskDetailFormProjectSelect projects={projects} />}
      assigneeSelect={<TaskDetailFormAssigneeSelect users={users} />}
    />
  );
}
