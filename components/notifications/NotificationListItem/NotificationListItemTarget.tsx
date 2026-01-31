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

const CompanyTarget = ({
  entity,
  name,
}: {
  entity?: { id: number; name: string } | null;
  name?: string | null;
}) => <Target label={entity?.name || name} />;

const PositionTarget = ({
  entity,
  name,
}: {
  entity?: { id: number; name: string } | null;
  name?: string | null;
}) => <Target label={entity?.name || name} />;

const TaskCategoryTarget = ({
  entity,
  name,
}: {
  entity?: { id: number; name: string } | null;
  name?: string | null;
}) => <Target label={entity?.name || name} />;

const ProjectCategoryTarget = ({
  entity,
  name,
}: {
  entity?: { id: number; name: string } | null;
  name?: string | null;
}) => <Target label={entity?.name || name} />;

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

  // company related

  if (type === "companyDeleted") {
    return <span className={styles}>{notification.companyName}</span>;
  }

  if (type === "companyAdded" || type === "companyChanged") {
    return (
      <CompanyTarget
        entity={notification.company}
        name={notification.companyName}
      />
    );
  }

  // task category related

  if (type === "taskCategoryDeleted") {
    return <span className={styles}>{notification.taskCategoryName}</span>;
  }

  if (type === "taskCategoryAdded" || type === "taskCategoryChanged") {
    return (
      <TaskCategoryTarget
        entity={notification.taskCategory}
        name={notification.taskCategoryName}
      />
    );
  }

  // project category related

  if (type === "projectCategoryDeleted") {
    return <span className={styles}>{notification.projectCategoryName}</span>;
  }

  if (type === "projectCategoryAdded" || type === "projectCategoryChanged") {
    return (
      <ProjectCategoryTarget
        entity={notification.projectCategory}
        name={notification.projectCategoryName}
      />
    );
  }

  // position related

  if (type === "positionDeleted") {
    return <span className={styles}>{notification.positionName}</span>;
  }

  if (type === "positionAdded" || type === "positionChanged") {
    return (
      <PositionTarget
        entity={notification.position}
        name={notification.positionName}
      />
    );
  }

  // subtask-related
  if (
    type === "subtaskAdded" ||
    type === "subtaskChanged" ||
    type === "subtaskDeleted"
  ) {
    return (
      <TaskTarget entity={notification.task} title={notification.taskTitle} />
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
