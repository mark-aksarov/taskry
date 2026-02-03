import "server-only";

import {
  TaskFormBaseSkeleton,
  TaskFormBaseStatusSelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
} from "../TaskFormBase";

import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { createTask } from "@/lib/actions/task/createTask";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export function NewTaskFormContainer() {
  return (
    <Suspense fallback={<TaskFormBaseSkeleton />}>
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
      taskStatusSelect={<TaskFormBaseStatusSelect />}
      taskCategorySelect={
        <TaskFormBaseCategorySelect categories={categories} />
      }
      projectSelect={<TaskFormBaseProjectSelect projects={projects} />}
      assigneeSelect={<TaskFormBaseAssigneeSelect users={users} />}
      formAction={createTask}
    />
  );
}
