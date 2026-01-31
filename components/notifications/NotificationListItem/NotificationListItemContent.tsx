import {
  CommentItemText,
  CommentItemContent,
} from "@/components/comments/CommentItem";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

type Props = {
  notification: NotificationListItemDTO;
};

export function NotificationListItemContent({ notification }: Props) {
  const { type } = notification;

  // comment-related
  if (type.includes("comment")) {
    return (
      <CommentItemContent className="ml-0">
        <CommentItemText>{notification.commentContent}</CommentItemText>
      </CommentItemContent>
    );
  }

  // subtask-related
  if (type.includes("subtask")) {
    return (
      <CommentItemContent className="ml-0">
        <CommentItemText>{notification.subtaskText}</CommentItemText>
      </CommentItemContent>
    );
  }

  return null;
}
