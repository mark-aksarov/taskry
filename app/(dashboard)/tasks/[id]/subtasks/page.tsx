import {
  DetailCard,
  DetailCardHeader,
  DetailCardLeft,
  DetailCardTitle,
} from "@/components/common/Detail";
import { DetailPanel } from "@/components/common/DetailPanel";
import { List } from "@/components/common/List";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import { Repeat } from "@/components/common/Repeat";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { SubtaskActionsMenuTrigger } from "@/components/subtasks/SubtaskActionsMenuTrigger";
import { SubtaskListItem } from "@/components/subtasks/SubtaskListItem";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { TaskSubtasksDesktop } from "@/components/tasks/TaskSubtasksDesktop";
import { TaskSubtasksMobile } from "@/components/tasks/TaskSubtasksMobile";
import { Suspense } from "react";

export default async function TaskSubtasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader className="pr-4">
              <DetailCardTitle>Subtasks</DetailCardTitle>
              <SubtaskActionsMenuTrigger />
            </DetailCardHeader>
            <Suspense
              fallback={
                <List className="gap-0">
                  <Repeat items={10} renderItem={() => <SubtaskListItem />} />
                </List>
              }
            >
              <TaskSubtasksDesktop taskId={+id} />
            </Suspense>
          </DetailCardLeft>

          <DetailPanel>
            <Suspense fallback={<TaskDetailPanelHeaderSkeleton />}>
              <TaskDetailPanelHeader id={+id} />
            </Suspense>
            <TaskDetailNavigation />
          </DetailPanel>
        </DetailCard>
      </PageContainer>

      <Suspense
        fallback={
          <PageContainer className="md:hidden">
            <PageGrid>
              <ToolbarMobileTop>
                <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
              </ToolbarMobileTop>
              <List>
                <Repeat items={10} renderItem={() => <SubtaskListItem />} />
              </List>
            </PageGrid>
          </PageContainer>
        }
      >
        <TaskSubtasksMobile taskId={+id} />
      </Suspense>
    </>
  );
}
