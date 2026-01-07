"use client";

import { Item } from "react-stately";
import { twMerge } from "tailwind-merge";
import { ListCheck, Trash } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { NotificationListItemDate } from "./NotificationListItemDate";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";

export interface NotificationListItemProps {
  date: Date;
  isRead: boolean;
  actorLink: React.ReactNode;
  actorImageLink: React.ReactNode;
  actionContent: React.ReactNode;
  target: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

export const notificationListItemStyles =
  "flex items-start gap-3 border-gray-300 bg-white p-4 pr-2 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800";

export const NotificationListItem = ({
  isRead,
  actorLink,
  actorImageLink,
  actionContent,
  target,
  content,
  className,
  date,
}: NotificationListItemProps) => {
  const t = useTranslations("notifications.NotificationItem");

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

      <ItemBaseActionMenuTrigger className="ml-auto">
        <>
          {!isRead && (
            <Item textValue={t("markAsRead")} key="read">
              <ListCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
              {t("markAsRead")}
            </Item>
          )}
        </>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>
    </div>
  );
};
