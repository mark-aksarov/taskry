import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { AttachmentList } from "@/components/attachments/AttachmentList";
import { getAttachmentsByTask } from "@/lib/queries/attachments";

export async function TaskAttachments({ taskId }: { taskId: number }) {
  const attachments = await getAttachmentsByTask(taskId);

  if (!attachments.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No attachments yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Upload a file to attach it to this task
          </EmptySectionDescription>
          <EmptySectionLink href="#">Add Attachment</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <>
      <AttachmentList attachments={attachments} />
    </>
  );
}
