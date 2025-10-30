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
import { TaskCommentsMessageInputDesktop } from "@/components/tasks/TaskCommentsMessageInputDesktop";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { Suspense } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskCommentsDesktop } from "@/components/tasks/TaskCommentsDesktop";
import { TaskCommentsMobile } from "@/components/tasks/TaskCommentsMobile/TaskCommentsMobile";
import { TaskCommentsMessageInputMobile } from "@/components/tasks/TaskCommentsMessageInputMobile";

export default async function TaskCommentsPage({
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
            <DetailCardHeader>
              <DetailCardTitle>Task comments</DetailCardTitle>
            </DetailCardHeader>
            <div className="flex flex-auto flex-col p-6 pb-2">
              <TaskCommentsMessageInputDesktop />
              <Suspense
                fallback={
                  <List className="gap-0">
                    <Repeat items={10} renderItem={() => <CommentItem />} />
                  </List>
                }
              >
                <TaskCommentsDesktop taskId={+id} />
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
      </PageContainer>

      <Suspense
        fallback={
          <PageContainer className="md:hidden">
            <PageGrid>
              <ToolbarMobileTop>
                <ToolbarMobileHeading>Task comments</ToolbarMobileHeading>
              </ToolbarMobileTop>
              <List>
                <Repeat items={10} renderItem={() => <CommentItem />} />
              </List>
            </PageGrid>
          </PageContainer>
        }
      >
        <TaskCommentsMobile taskId={+id} />
      </Suspense>
    </>
  );
}
