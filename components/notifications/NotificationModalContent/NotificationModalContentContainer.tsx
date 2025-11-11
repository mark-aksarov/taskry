import { Link } from "@/components/ui";
import { NotificationList } from "../NotificationList";
import { NotificationListItem } from "../NotificationListItem";
import { NotificationModalContent } from "./NotificationModalContent";
import {
  getNotifications,
  GetNotificationsType,
} from "@/lib/queries/notification";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup/NotificationFilterToggleButtonGroup";

function getActionText(notification: GetNotificationsType[number]) {
  switch (notification.type) {
    case "TASK_ADDED":
      return "added a new task";
    case "TASK_DELETED":
      return "deleted a task";
    case "TASK_UPDATED":
      return "updated a task";

    case "PROJECT_ADDED":
      return "added a new project";
    case "PROJECT_DELETED":
      return "deleted a project";
    case "PROJECT_UPDATED":
      return "updated a project";

    case "USER_ADDED":
      return "added a new user";
    case "USER_DELETED":
      return "deleted a user";
    case "USER_UPDATED":
      return "updated a user";

    case "CUSTOMER_ADDED":
      return "added a new customer";
    case "CUSTOMER_DELETED":
      return "deleted a customer";
    case "CUSTOMER_UPDATED":
      return "updated a customer";

    case "COMMENT_REPLIED":
      return "replied to a comment in";
    case "COMMENT_ADDED":
      return "added a comment to";

    default:
      throw new Error("Invalid notification type");
  }
}

function getTarget(notification: GetNotificationsType[number]) {
  const { type, target, targetName } = notification;
  switch (type) {
    case "TASK_ADDED":
    case "TASK_UPDATED":
      return (
        <Link href={`/users/${target?.task?.id}`}>{target?.task?.title}</Link>
      );
    case "TASK_DELETED":
      return targetName;

    case "PROJECT_ADDED":
    case "PROJECT_UPDATED":
      return (
        <Link href={`/users/${target?.project?.id}`}>
          {target?.project?.title}
        </Link>
      );
    case "PROJECT_DELETED":
      return targetName;

    case "USER_ADDED":
    case "USER_UPDATED":
      return (
        <Link href={`/users/${target?.user?.id}`}>
          {target?.user?.fullName}
        </Link>
      );
    case "USER_DELETED":
      return targetName;

    case "CUSTOMER_ADDED":
    case "CUSTOMER_UPDATED":
      return (
        <Link href={`/customers/${target?.customer?.id}`}>
          {target?.customer?.fullName}
        </Link>
      );
    case "CUSTOMER_DELETED":
      return targetName;

    case "COMMENT_REPLIED": {
      const comment = target?.comment!;
      return (
        <Link
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
      likes: target.comment._count?.likes,
      likedByMe: target.comment.likes.length > 0,
      attachments: target.comment.attachments.map((attachment) => ({
        id: attachment.id,
        fileUrl: attachment.fileUrl,
        fileName: attachment.fileName,
      })),
    };
  }

  return undefined;
}

export async function NotificationModalContentContainer() {
  const notifications: GetNotificationsType = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

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
            actionText={getActionText(notification)}
            target={getTarget(notification)}
            comment={getComment(notification)}
          />
        ))}
      </NotificationList>
    </NotificationModalContent>
  );
}
