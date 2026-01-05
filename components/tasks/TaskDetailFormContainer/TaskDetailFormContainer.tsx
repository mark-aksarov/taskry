import { getUserSummaries } from "@/lib/data/user/user.service";
import { TaskDetailForm } from "../TaskDetailForm/TaskDetailForm";
import { getProjectSummaries } from "@/lib/data/project/project.service";
import { TaskDetailFormStatusSelect } from "../TaskDetailForm/TaskDetailFormStatusSelect";
import { TaskDetailFormProjectSelect } from "../TaskDetailForm/TaskDetailFormProjectSelect";
import { TaskDetailFormAssigneeSelect } from "../TaskDetailForm/TaskDetailFormAssigneeSelect";

export async function TaskDetailFormContainer() {
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
