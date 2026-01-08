import {
  CommentItemText,
  CommentItemContent,
} from "@/components/comments/CommentItem";

import { useFormatter, useTranslations } from "next-intl";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

type Props = {
  notification: NotificationListItemDTO;
};

export function NotificationListItemContent({ notification }: Props) {
  const t = useTranslations("notifications.NotificationItem.content");
  const format = useFormatter();

  const styles = "text-sm text-black dark:text-white";
  const { type } = notification;

  const formatDeadline = (date: Date) =>
    format.dateTime(date, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // deadline changed
  if (type === "projectDeadlineChanged" || type === "taskDeadlineChanged") {
    const deadline =
      type === "projectDeadlineChanged"
        ? notification.projectDeadline
        : notification.taskDeadline;

    return (
      <span className={styles}>
        {t("deadlineChanged", {
          deadline: formatDeadline(new Date(deadline!)),
        })}
      </span>
    );
  }

  // comment-related
  if (type.includes("comment")) {
    return (
      <CommentItemContent className="ml-0">
        <CommentItemText>{notification.commentContent}</CommentItemText>
      </CommentItemContent>
    );
  }

  // status changed
  if (type === "projectStatusChanged" || type === "taskStatusChanged") {
    const status =
      type === "projectStatusChanged"
        ? notification.projectStatus
        : notification.taskStatus;

    return (
      <span className={styles}>{t("statusChanged", { status: status! })}</span>
    );
  }

  return null;
}
