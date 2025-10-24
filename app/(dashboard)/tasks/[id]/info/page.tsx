import { Suspense } from "react";
import { TaskInfo, TaskInfoSkeleton } from "@/components/tasks/TaskInfo";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { getTask } from "@/lib/queries/task";

export default async function TaskInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskPromise = getTask(+id);

  return (
    <>
      <TaskDetailCard id={+id} />

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Task Information</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <Card>
            <Suspense fallback={<TaskInfoSkeleton />}>
              <TaskInfo taskPromise={taskPromise} />
            </Suspense>
          </Card>
        </PageGrid>
      </div>
    </>
  );
}
