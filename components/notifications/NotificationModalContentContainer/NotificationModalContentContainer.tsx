"use client";

import {
  NotificationListItem,
  NotificationListItemTarget,
  NotificationListItemContent,
  NotificationListItemActorLink,
  NotificationListItemActionText,
  NotificationListItemActorImageLink,
  NotificationListItemActionMenuTrigger,
} from "../NotificationListItem";

import useSWR from "swr";
import { useState } from "react";
import { NotificationFilter } from "../types";
import { NotificationList } from "../NotificationList";
import { NotificationModalContent } from "../NotificationModalContent";
import { NotificationEmptySection } from "../NotificationEmptySection";
import { NotificationsDTO } from "@/lib/data/notification/notification.dto";
import { deleteNotification } from "@/lib/actions/notification/deleteNotification";
import { markNotificationsAsRead } from "@/lib/actions/notification/markNotificationsAsRead";

interface NotificationModalContentContainerProps {
  guestMode?: boolean;
}

export function NotificationModalContentContainer({
  guestMode,
}: NotificationModalContentContainerProps) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const pageSize = 10;

  const { data, mutate } = useSWR<NotificationsDTO>(
    `/api/notifications?page=${page}&pageSize=${pageSize}&filter=${filter}`,
    {
      suspense: true,
    },
  );

  if (!data || data.items.length === 0) {
    return <NotificationEmptySection />;
  }

  const { items, totalCount, unreadCount } = data;

  const countForPagination = filter === "unread" ? unreadCount : totalCount;
  const totalPages = Math.ceil(countForPagination / pageSize);

  return (
    <NotificationModalContent
      guestMode={guestMode}
      markAsReadAction={markNotificationsAsRead}
      mutate={mutate}
      notificationList={
        <NotificationList>
          {items.map((notification) => {
            return (
              <NotificationListItem
                key={notification.id}
                id={notification.id}
                isRead={notification.isRead}
                date={notification.createdAt}
                target={
                  <NotificationListItemTarget notification={notification} />
                }
                content={
                  <NotificationListItemContent notification={notification} />
                }
                actorImageLink={
                  <NotificationListItemActorImageLink
                    actor={notification.actor}
                  />
                }
                actorLink={
                  <NotificationListItemActorLink actor={notification.actor} />
                }
                actionContent={
                  <NotificationListItemActionText
                    notificationType={notification.type}
                  />
                }
                menuTrigger={
                  <NotificationListItemActionMenuTrigger
                    notificaitonId={notification.id}
                    isRead={notification.isRead}
                    guestMode={guestMode}
                    deleteAction={deleteNotification}
                    markAsReadAction={markNotificationsAsRead}
                    mutate={mutate}
                  />
                }
              />
            );
          })}
        </NotificationList>
      }
      totalCount={totalCount}
      unreadCount={unreadCount}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      setPage={setPage}
      filter={filter}
      setFilter={setFilter}
    />
  );
}
