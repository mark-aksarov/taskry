import { AttachmentActionsMenuTrigger } from "@/components/attachments/AttachmentActionsMenuTrigger";
import { AttachmentList } from "@/components/attachments/AttachmentList";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { getAttachmentsByTask } from "@/lib/queries/attachments";

export async function TaskAttachmentsMobile({ taskId }: { taskId: number }) {
  const attachments = await getAttachmentsByTask(taskId);

  if (!attachments.length) {
    return (
      <PageContainer fullscreen centered className="md:hidden">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No attachments yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Upload a file to attach it to this task
          </EmptySectionDescription>
          <EmptySectionLink href="#">Add Attachment</EmptySectionLink>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Attachments</ToolbarMobileHeading>
          <AttachmentActionsMenuTrigger />
        </ToolbarMobileTop>
        <AttachmentList attachments={attachments} />
      </PageGrid>
    </PageContainer>
  );
}
