import { CommentItem } from "@/components/comments/CommentItem";
import {
  DetailCard,
  DetailCardHeader,
  DetailCardLeft,
  DetailCardTitle,
} from "@/components/common/Detail";
import { DetailPanel } from "@/components/common/DetailPanel";
import { List } from "@/components/common/List";
import { PageGrid } from "@/components/common/PageGrid";
import { Repeat } from "@/components/common/Repeat";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskComments } from "@/components/tasks/TaskComments/TaskComments";
import { TaskCommentsMessageInput } from "@/components/tasks/TaskCommentsMessageInput";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { Suspense } from "react";

export default async function TaskCommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <DetailCard className="max-md:hidden">
        <DetailCardLeft>
          <DetailCardHeader>
            <DetailCardTitle>Task comments</DetailCardTitle>
          </DetailCardHeader>
          <div className="p-6 pb-2">
            <TaskCommentsMessageInput />
            <Suspense
              fallback={
                <List className="gap-0">
                  <Repeat items={10} renderItem={() => <CommentItem />} />
                </List>
              }
            >
              <TaskComments taskId={+id} />
            </Suspense>
          </div>
        </DetailCardLeft>

        <DetailPanel>
          <Suspense fallback={<TaskDetailPanelHeaderSkeleton />}>
            <TaskDetailPanelHeader id={+id} />
          </Suspense>
          <TaskDetailNavigation />
        </DetailPanel>
      </DetailCard>

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Task comments</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <TaskCommentsMessageInput />
          <Suspense
            fallback={
              <List className="gap-4">
                <Repeat items={10} renderItem={() => <CommentItem />} />
              </List>
            }
          >
            <TaskComments taskId={+id} />
          </Suspense>
        </PageGrid>
      </div>
    </>
  );
}
