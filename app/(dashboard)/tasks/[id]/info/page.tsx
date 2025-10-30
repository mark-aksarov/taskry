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
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailPanelHeader } from "@/components/tasks/TaskDetailPanelHeader";

export default async function TaskInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskPromise = getTask(+id);

  return (
    <PageContainer>
      <TaskDetailCard id={+id} />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Task Information</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <Card className="flex flex-col gap-4">
          <TaskDetailPanelHeader id={+id} />
          <Suspense fallback={<TaskInfoSkeleton />}>
            <TaskInfo taskPromise={taskPromise} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
