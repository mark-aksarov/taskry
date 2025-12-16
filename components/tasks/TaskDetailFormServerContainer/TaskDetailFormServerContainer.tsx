import { getUserSummaries } from "@/lib/data/user";
import { getProjectSummaries } from "@/lib/data/project";
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
