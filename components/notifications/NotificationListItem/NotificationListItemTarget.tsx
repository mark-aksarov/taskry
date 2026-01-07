"use client";

import { Link } from "@/components/ui";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

export function NotificationListItemTarget({
  notification,
}: {
  notification: NotificationListItemDTO;
}) {
  const type = notification.type.toLowerCase();
  const target = notification.target;

  const styles =
    "text-sm font-semibold text-black dark:text-white text-wrap inline";

  // deleted is plain text
  if (type.includes("deleted")) {
    const project = target?.project;
    const task = target?.task;

    if (project) {
      return (
        <Link className={styles} href={`/projects/${project.id}`}>
          {project.title}
        </Link>
      );
    }

    if (task) {
      return (
        <Link className={styles} href={`/tasks/${task.id}`}>
          {task.title}
        </Link>
      );
    }

    return <span className={styles}>{notification.content}</span>;
  }

  // project
  if (type.includes("project")) {
    const project = target?.project;
    if (!project) return null;

    return (
      <Link className={styles} href={`/projects/${project.id}`}>
        {project.title}
      </Link>
    );
  }

  // task
  if (type.includes("task")) {
    const task = target?.task;
    if (!task) return null;

    return (
      <Link className={styles} href={`/tasks/${task.id}`}>
        {task.title}
      </Link>
    );
  }

  // comment
  if (type.includes("comment")) {
    const comment = target?.comment;
    if (!comment) return null;

    if (comment.project) {
      return (
        <Link className={styles} href={`/projects/${comment.project.id}`}>
          {comment.project.title}
        </Link>
      );
    }

    if (comment.task) {
      return (
        <Link className={styles} href={`/tasks/${comment.task.id}`}>
          {comment.task.title}
        </Link>
      );
    }
  }

  return null;
}
