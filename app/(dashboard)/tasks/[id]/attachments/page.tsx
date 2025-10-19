import { getAttachmentsByTask } from "@/lib/queries/attachments";
import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";
import { SubtaskActionsMenuTrigger } from "@/components/subtasks/SubtaskActionsMenuTrigger";
import { AttachmentList } from "@/components/attachments/AttachmentList";

export default async function TaskAttachmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attachments = await getAttachmentsByTask(+id);

  if (!attachments.length) {
    return (
      <PageGrid>
        <ToolbarDesktop>
          <TaskPageTabs />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>Attachments</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <TaskPageTabs />
        </ToolbarMobileBottom>

        <Centered>
          <EmptySection className="w-[25rem]">
            <EmptySectionHeading>No attachments yet</EmptySectionHeading>
            <EmptySectionDescription>
              Upload a file to attach it to this task
            </EmptySectionDescription>
            <EmptySectionLink href="#">Add Attachment</EmptySectionLink>
          </EmptySection>
        </Centered>
      </PageGrid>
    );
  }

  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
        <SubtaskActionsMenuTrigger />
      </ToolbarDesktop>
      <ToolbarMobileTop>
        <ToolbarMobileHeading>Attachments</ToolbarMobileHeading>
        <SubtaskActionsMenuTrigger />
      </ToolbarMobileTop>
      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>
      <AttachmentList attachments={attachments} />
    </PageGrid>
  );
}
