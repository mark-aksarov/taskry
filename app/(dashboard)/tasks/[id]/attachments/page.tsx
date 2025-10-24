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
import { PageGrid } from "@/components/common/PageGrid";
import { Repeat } from "@/components/common/Repeat";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskAttachments } from "@/components/tasks/TaskAttachments";
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
      <DetailCard className="max-md:hidden">
        <DetailCardLeft>
          <DetailCardHeader className="pr-4">
            <DetailCardTitle>Attachments</DetailCardTitle>
            <AttachmentActionsMenuTrigger />
          </DetailCardHeader>
          <Suspense
            fallback={
              <List className="gap-0">
                <Repeat items={10} renderItem={() => <AttachmentListItem />} />
              </List>
            }
          >
            <TaskAttachments taskId={+id} />
          </Suspense>
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
            <ToolbarMobileHeading>Subtasks</ToolbarMobileHeading>
            <AttachmentActionsMenuTrigger />
          </ToolbarMobileTop>

          <Suspense
            fallback={
              <List>
                <Repeat items={10} renderItem={() => <AttachmentListItem />} />
              </List>
            }
          >
            <TaskAttachments taskId={+id} />
          </Suspense>
        </PageGrid>
      </div>
    </>
  );
}
