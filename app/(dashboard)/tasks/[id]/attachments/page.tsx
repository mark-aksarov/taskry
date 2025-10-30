import { AttachmentActionsMenuTrigger } from "@/components/attachments/AttachmentActionsMenuTrigger";
import { AttachmentListItem } from "@/components/attachments/AttachmentListItem";
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
import { TaskAttachmentsDesktop } from "@/components/tasks/TaskAttachmentsDesktop";
import { TaskAttachmentsMobile } from "@/components/tasks/TaskAttachmentsMobile";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { Suspense } from "react";

export default async function TaskAttachmentsPage({
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
              <DetailCardTitle>Attachments</DetailCardTitle>
              <AttachmentActionsMenuTrigger />
            </DetailCardHeader>
            <Suspense
              fallback={
                <List className="gap-0">
                  <Repeat
                    items={10}
                    renderItem={() => <AttachmentListItem />}
                  />
                </List>
              }
            >
              <TaskAttachmentsDesktop taskId={+id} />
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
                <Repeat items={10} renderItem={() => <AttachmentListItem />} />
              </List>
            </PageGrid>
          </PageContainer>
        }
      >
        <TaskAttachmentsMobile taskId={+id} />
      </Suspense>
    </>
  );
}
