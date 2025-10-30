import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { AttachmentList } from "@/components/attachments/AttachmentList";
import { getAttachmentsByTask } from "@/lib/queries/attachments";

export async function TaskAttachmentsDesktop({ taskId }: { taskId: number }) {
  const attachments = await getAttachmentsByTask(taskId);

  if (!attachments.length) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No attachments yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Upload a file to attach it to this task
          </EmptySectionDescription>
          <EmptySectionLink href="#">Add Attachment</EmptySectionLink>
        </EmptySection>
      </div>
    );
  }

  return (
    <>
      <AttachmentList attachments={attachments} />
    </>
  );
}
