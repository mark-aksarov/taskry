import {
  CommentItemText,
  CommentItemContent,
} from "@/components/comments/CommentItem";

import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

export function NotificationListItemContent({
  notification,
}: {
  notification: NotificationListItemDTO;
}) {
  const t = useTranslations("notifications.NotificationItem.content");

  const format = useFormatter();

  const styles = "text-sm text-black dark:text-white";

  const type = notification.type.toLowerCase();
  const target = notification.target;
  const content = notification.content;

  if (type.includes("deadline")) {
    const date = target!.project
      ? target!.project.deadline
      : target!.task!.deadline;

    const formattedDate = format.dateTime(new Date(date), {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return (
      <span className={styles}>
        {t("deadlineChanged", { deadline: formattedDate })}
      </span>
    );
  } else if (type.includes("comment")) {
    if (!target!.comment) {
      return <span className={styles}>{content}</span>;
    }

    const comment = target!.comment!;

    return (
      <CommentItemContent className="ml-0">
        <CommentItemText>{comment.content}</CommentItemText>
        {comment.attachments.length > 0 && (
          <Attachments>
            {comment.attachments.map((attachment) => (
              <Attachment key={attachment.id}>
                <Image
                  src={attachment.fileUrl}
                  alt=""
                  fill
                  className="object-cover"
                />
              </Attachment>
            ))}
          </Attachments>
        )}
      </CommentItemContent>
    );
  } else if (type.includes("status")) {
    const project = target?.project;
    const task = target?.task;
    const status = project ? project.status : task!.status;

    return <span className={styles}>{t("statusChanged", { status })}</span>;
  }

  return null;
}
