import { getUserSummaries } from "@/lib/data/user/user.dal";
import { TaskDetailForm } from "../TaskDetailForm/TaskDetailForm";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
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
