import "server-only";

import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

interface NewTaskFormContainerProps {
  forcedAssigneeId?: string;
}

export function NewTaskFormContainer(props: NewTaskFormContainerProps) {
  return (
    <Suspense fallback={<TaskFormSkeleton />}>
      <NewTaskFormContainerInner {...props} />
    </Suspense>
  );
}

async function NewTaskFormContainerInner({
  forcedAssigneeId,
}: NewTaskFormContainerProps) {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <NewTaskForm
      forcedAssigneeId={forcedAssigneeId}
      categorySelectItems={categories}
      projectSelectItems={projects}
      assigneeSelectItems={users}
    />
  );
}
