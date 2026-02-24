import "server-only";

import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { createTask } from "@/lib/actions/task/createTask";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export function NewTaskFormContainer() {
  return (
    <Suspense fallback={<TaskFormSkeleton />}>
      <NewTaskFormContainerInner />
    </Suspense>
  );
}

async function NewTaskFormContainerInner() {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <NewTaskForm
      categorySelectItems={categories}
      projectSelectItems={projects}
      assigneeSelectItems={users}
      createTask={createTask}
    />
  );
}
