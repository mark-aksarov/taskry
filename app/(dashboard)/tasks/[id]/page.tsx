import { Card } from "@/components/common/Card";
import { DetailPanel } from "@/components/common/DetailPanel";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { Suspense } from "react";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <TaskDetailCard id={+id} />

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Task Settings</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <Card>
            <DetailPanel>
              <Suspense fallback={<TaskDetailPanelHeaderSkeleton />}>
                <TaskDetailPanelHeader id={+id} />
              </Suspense>
              <TaskDetailNavigation />
            </DetailPanel>
          </Card>
        </PageGrid>
      </div>
    </>
  );
}
