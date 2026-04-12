import "server-only";

import { Suspense } from "react";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

interface CreateTaskFormContainerProps {
  forcedAssigneeId?: string;
}

export function CreateTaskFormContainer(props: CreateTaskFormContainerProps) {
  return (
    <Suspense fallback={<TaskFormSkeleton />}>
      <CreateTaskFormContainerInner {...props} />
    </Suspense>
  );
}

async function CreateTaskFormContainerInner({
  forcedAssigneeId,
}: CreateTaskFormContainerProps) {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <CreateTaskForm
      forcedAssigneeId={forcedAssigneeId}
      categorySelectItems={categories}
      projectSelectItems={projects}
      assigneeSelectItems={users}
    />
  );
}
