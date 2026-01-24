"use client";

import { Link } from "@/components/ui/Link";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

type Props = {
  notification: NotificationListItemDTO;
};

const styles =
  "text-sm font-semibold text-black dark:text-white text-wrap inline";

interface TargetProps {
  label?: string | null;
  href?: string | null;
}

const Target = ({ label, href }: TargetProps) => {
  if (!label) return null;

  return href ? (
    <Link className={styles} href={href}>
      {label}
    </Link>
  ) : (
    <span className={styles}>{label}</span>
  );
};

const ProjectTarget = ({
  entity,
  title,
}: {
  entity?: { id: number; title: string } | null;
  title?: string | null;
}) => (
  <Target
    label={entity?.title || title}
    href={entity ? `/projects/${entity.id}` : null}
  />
);

const TaskTarget = ({
  entity,
  title,
}: {
  entity?: { id: number; title: string } | null;
  title?: string | null;
}) => (
  <Target
    label={entity?.title || title}
    href={entity ? `/tasks/${entity.id}` : null}
  />
);

const UserTarget = ({
  entity,
  fullName,
}: {
  entity?: { id: string; fullName: string } | null;
  fullName?: string | null;
}) => (
  <Target
    label={entity?.fullName || fullName}
    href={entity ? `/users/${entity.id}` : null}
  />
);

const CustomerTarget = ({
  entity,
  fullName,
}: {
  entity?: { id: number; fullName: string } | null;
  fullName?: string | null;
}) => (
  <Target
    label={entity?.fullName || fullName}
    href={entity ? `/customers/${entity.id}` : null}
  />
);

export function NotificationListItemTarget({ notification }: Props) {
  const { type } = notification;

  // task related

  if (type === "taskDeleted") {
    return <span className={styles}>{notification.taskTitle}</span>;
  }

  if (type === "taskAdded" || type === "taskChanged") {
    return (
      <TaskTarget entity={notification.task} title={notification.taskTitle} />
    );
  }

  // project related

  if (type === "projectDeleted") {
    return <span className={styles}>{notification.projectTitle}</span>;
  }

  if (type === "projectAdded" || type === "projectChanged") {
    return (
      <ProjectTarget
        entity={notification.project}
        title={notification.projectTitle}
      />
    );
  }

  // user related

  if (type === "userDeleted") {
    return <span className={styles}>{notification.userFullName}</span>;
  }

  if (type === "userAdded" || type === "userChanged") {
    return (
      <UserTarget
        entity={notification.user}
        fullName={notification.userFullName}
      />
    );
  }

  // customer related

  if (type === "customerDeleted") {
    return <span className={styles}>{notification.customerFullName}</span>;
  }

  if (type === "customerAdded" || type === "customerChanged") {
    return (
      <CustomerTarget
        entity={notification.customer}
        fullName={notification.customerFullName}
      />
    );
  }

  // comment-related (project OR task)
  if (
    type === "commentAdded" ||
    type === "commentChanged" ||
    type === "commentDeleted"
  ) {
    if (notification.project || notification.projectTitle) {
      return (
        <ProjectTarget
          entity={notification.project}
          title={notification.projectTitle}
        />
      );
    }

    if (notification.task || notification.taskTitle) {
      return (
        <TaskTarget entity={notification.task} title={notification.taskTitle} />
      );
    }
  }

  return null;
}
