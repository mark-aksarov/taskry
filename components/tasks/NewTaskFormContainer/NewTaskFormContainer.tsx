import "server-only";

import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { createTask } from "@/lib/actions/task/createTask";
import { TaskCategorySelect } from "../TaskCategorySelect";
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
      taskCategorySelect={<TaskCategorySelect categories={categories} />}
      projectSelect={<TaskProjectSelect projects={projects} />}
      assigneeSelect={<TaskAssigneeSelect users={users} />}
      createTask={createTask}
    />
  );
}
