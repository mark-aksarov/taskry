import { getUserSummaries } from "@/lib/queries/user";
import { getProjectSummaries } from "@/lib/queries/project";
import { TaskDetailForm } from "../TaskDetailForm/TaskDetailForm";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { TaskDetailFormStatusSelect } from "../TaskDetailForm/TaskDetailFormStatusSelect";
import { TaskDetailFormProjectSelect } from "../TaskDetailForm/TaskDetailFormProjectSelect";
import { TaskDetailFormAssigneeSelect } from "../TaskDetailForm/TaskDetailFormAssigneeSelect";

export async function TaskDetailFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const projects = await getProjectSummaries(workspaceId);
  const users = await getUserSummaries(workspaceId);

  return (
    <TaskDetailForm
      taskStatusSelect={<TaskDetailFormStatusSelect />}
      projectSelect={
        <TaskDetailFormProjectSelect
          projects={projects.map((p) => ({ id: p.id, title: p.title }))}
        />
      }
      assigneeSelect={
        <TaskDetailFormAssigneeSelect
          users={users.map((u) => ({ id: u.id, fullName: u.fullName }))}
        />
      }
    />
  );
}
