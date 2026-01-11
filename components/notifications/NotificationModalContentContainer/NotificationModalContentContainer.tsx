"use client";

import {
  NotificationListItem,
  NotificationListItemTarget,
  NotificationListItemContent,
  NotificationListItemActorLink,
  NotificationListItemActionText,
  NotificationListItemActorImageLink,
} from "../NotificationListItem";

import useSWR from "swr";
import { useState } from "react";
import { NotificationFilter } from "../types";
import { NotificationList } from "../NotificationList";
import { NotificationModalContent } from "../NotificationModalContent";
import { NotificationsDTO } from "@/lib/data/notification/notification.dto";

export function NotificationModalContentContainer() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const pageSize = 10;

  const { data } = useSWR<NotificationsDTO>(
    `/api/notifications?page=${page}&pageSize=${pageSize}&filter=${filter}`,
    {
      suspense: true,
    },
  );

  if (!data) {
    throw <div>Empty notification</div>;
  }

  const { items, totalCount, unreadCount } = data;

  const countForPagination = filter === "unread" ? unreadCount : totalCount;
  const totalPages = Math.ceil(countForPagination / pageSize);

  return (
    <NotificationModalContent
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
