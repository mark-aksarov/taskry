"use client";

import { Link } from "@/components/ui";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

type Props = {
  notification: NotificationListItemDTO;
};

const styles =
  "text-sm font-semibold text-black dark:text-white text-wrap inline";

function renderTarget({
  entity,
  title,
  href,
}: {
  entity?: { id: number; title: string } | null;
  title?: string | null;
  href: (id: number) => string;
}) {
  // for cases where the entity (project / task) has been deleted after the notification was created
  if (!entity && title) {
    return <span className={styles}>{title}</span>;
  }

  // entity  (project / task) exists
  if (entity) {
    return (
      <Link className={styles} href={href(entity.id)}>
        {entity.title}
      </Link>
    );
  }

  return null;
}

export function NotificationListItemTarget({ notification }: Props) {
  const { type } = notification;

  // deleted task
  if (type === "taskDeleted") {
    return <span className={styles}>{notification.taskTitle}</span>;
  }

  // deleted project
  if (type === "projectDeleted") {
    return <span className={styles}>{notification.projectTitle}</span>;
  }

  // project-related
  if (
    type === "projectAdded" ||
    type === "projectDeadlineChanged" ||
    type === "projectStatusChanged"
  ) {
    return renderTarget({
      entity: notification.project,
      title: notification.projectTitle,
      href: (id) => `/projects?projectId=${id}`,
    });
  }

  // task-related
  if (
    type === "taskAdded" ||
    type === "taskDeadlineChanged" ||
    type === "taskStatusChanged"
  ) {
    return renderTarget({
      entity: notification.task,
      title: notification.taskTitle,
      href: (id) => `/tasks?taskId=${id}`,
    });
  }

  // comment-related (project OR task)
  if (
    type === "commentAdded" ||
    type === "commentChanged" ||
    type === "commentDeleted"
  ) {
    return (
      renderTarget({
        entity: notification.project,
        title: notification.projectTitle,
        href: (id) => `/projects?projectId=${id}`,
      }) ??
      renderTarget({
        entity: notification.task,
        title: notification.taskTitle,
        href: (id) => `/tasks?taskId=${id}`,
      })
    );
  }

  return null;
}
