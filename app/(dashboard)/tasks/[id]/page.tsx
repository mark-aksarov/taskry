import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import {
  TaskDetailsCard,
  TaskDetailsCardSkeleton,
} from "@/components/tasks/TaskDetailsCard";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";
import {
  TaskSummaryCard,
  TaskSummaryCardSkeleton,
} from "@/components/tasks/TaskSummaryCard";
import { getTask } from "@/lib/queries/task";
import { Suspense } from "react";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskPromise = getTask(+id);

  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Task Information</ToolbarMobileHeading>
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>

      <Suspense
        fallback={
          <>
            <TaskSummaryCardSkeleton />
            <TaskDetailsCardSkeleton />
          </>
        }
      >
        <TaskSummaryCard id={+id} />
        <TaskDetailsCard taskPromise={taskPromise} />
      </Suspense>
    </PageGrid>
  );
}
