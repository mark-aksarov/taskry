import {
  getNotifications,
  GetNotificationsType,
} from "@/lib/queries/notification";
import { Link } from "@/components/ui";
import { NotificationList } from "../NotificationList";
import { NotificationListItem } from "../NotificationListItem";
import { NotificationModalContent } from "../NotificationModalContent";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

function getTarget(notification: GetNotificationsType[number]) {
  const { type, target, targetName } = notification;
  switch (type) {
    case "TASK_ADDED":
    case "TASK_UPDATED":
      return (
        <Link className="inline" href={`/users/${target?.task?.id}`}>
          {target?.task?.title}
        </Link>
      );
    case "TASK_DELETED":
      return targetName;

    case "PROJECT_ADDED":
    case "PROJECT_UPDATED":
      return (
        <Link className="inline" href={`/users/${target?.project?.id}`}>
          {target?.project?.title}
        </Link>
      );
    case "PROJECT_DELETED":
      return targetName;

    case "USER_ADDED":
    case "USER_UPDATED":
      return (
        <Link className="inline" href={`/users/${target?.user?.id}`}>
          {target?.user?.fullName}
        </Link>
      );
    case "USER_DELETED":
      return targetName;

    case "CUSTOMER_ADDED":
    case "CUSTOMER_UPDATED":
      return (
        <Link className="inline" href={`/customers/${target?.customer?.id}`}>
          {target?.customer?.fullName}
        </Link>
      );
    case "CUSTOMER_DELETED":
      return targetName;

    case "COMMENT_REPLIED": {
      const comment = target?.comment!;
      return (
        <Link
          className="inline"
          href={`/${comment.project ? "projects" : "tasks"}?commentId=${comment.id}`}
        >
          {comment.project ? comment.project.title : comment.task!.title}
        </Link>
      );
    }
    case "COMMENT_ADDED": {
      const comment = target?.comment!;
      return (
        <Link
          className="inline"
          href={`/${comment.project ? "projects" : "tasks"}?commentId=${comment.id}`}
        >
          {comment.project ? comment.project.title : comment.task!.title}
        </Link>
      );
    }

    default:
      throw new Error("Invalid notification type");
  }
}

function getComment(notification: GetNotificationsType[number]) {
  const { target } = notification;

  if (target?.comment) {
    return {
      id: target.comment.id,
      content: target.comment.content,
      attachments: target.comment.attachments.map((attachment) => ({
        id: attachment.id,
        fileUrl: attachment.fileUrl,
        fileName: attachment.fileName,
      })),
    };
  }

  return undefined;
}

export async function NotificationModalContentServerContainer() {
  const notifications: GetNotificationsType = await getNotifications(1);
  console.log(notifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationModalContent>
      <NotificationFilterToggleButtonGroup
        notificationsCount={notifications.length}
        unreadCount={unreadCount}
      />

      <NotificationList>
        {notifications.map((notification) => (
          <NotificationListItem
            key={notification.id}
            isRead={notification.isRead}
            actor={
              notification.actor
                ? {
                    id: notification.actor.id,
                    fullName: notification.actor.fullName,
                    imageUrl: notification.actor.imageUrl || undefined,
                  }
                : undefined
            }
            date={notification.createdAt}
            type={notification.type.toString()}
            target={getTarget(notification)}
            comment={getComment(notification)}
          />
        ))}
      </NotificationList>
    </NotificationModalContent>
  );
}
