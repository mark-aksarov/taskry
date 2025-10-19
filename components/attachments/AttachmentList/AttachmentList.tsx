import { AttachmentListItem } from "../AttachmentListItem";
import { List } from "@/components/common/List";
import { Attachment } from "@/generated/prisma";

interface TaskListProps {
  attachments: Attachment[];
}

export function AttachmentList({ attachments }: TaskListProps) {
  return (
    <List>
      {attachments.map((attachment) => (
        <AttachmentListItem key={attachment.id} attachment={attachment} />
      ))}
    </List>
  );
}
