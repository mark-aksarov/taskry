import { twMerge } from "tailwind-merge";
import { useFormatter } from "next-intl";
import { NotificationListItemDate } from "./NotificationListItemDate";

export interface NotificationListItemProps {
  id: number;
  date: Date;
  isRead: boolean;
  actorLink: React.ReactNode;
  actorImageLink: React.ReactNode;
  actionContent: React.ReactNode;
  target: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  menuTrigger?: React.ReactNode;
}

export const notificationListItemStyles =
  "flex items-start gap-3 border-gray-300 bg-white p-4 pr-2 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800";

export const NotificationListItem = ({
  date,
  isRead,
  actorLink,
  actorImageLink,
  actionContent,
  target,
  content,
  className,
  menuTrigger,
}: NotificationListItemProps) => {
  const format = useFormatter();

  const formattedDate = format.dateTime(new Date(date), {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      data-test="notification-list-item"
      className={twMerge(
        notificationListItemStyles,
        !isRead && "bg-gray-100/70 dark:bg-gray-700/70",
        className,
      )}
    >
      {actorImageLink}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="inline leading-none">
            {actorLink}
            {actionContent}
            {target}
          </span>
          <NotificationListItemDate>{formattedDate}</NotificationListItemDate>
        </div>
        {content}
      </div>

      {menuTrigger}
    </div>
  );
};
