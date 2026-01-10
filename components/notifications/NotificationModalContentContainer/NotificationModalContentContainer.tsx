"use client";

import {
  NotificationModalContent,
  NotificationModalContentStatus,
} from "../NotificationModalContent";

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
import { NotificationList } from "../NotificationList";
import { DialogBody, DialogFooter } from "@/components/ui";
import { Pagination } from "@/components/common/Pagination";
import { NotificationsDTO } from "@/lib/data/notification/notification.dto";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

type NotificationFilter = "all" | "unread";

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
    <>
      <DialogBody className="p-0!">
        <NotificationModalContent>
          <NotificationFilterToggleButtonGroup
            notificationsCount={totalCount}
            unreadCount={unreadCount}
            selectedKeys={[filter]}
            onSelectionChange={(keys) => {
              setPage(1);
              setFilter([...keys][0] as NotificationFilter);
            }}
          />

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
        </NotificationModalContent>
      </DialogBody>
      {totalPages > 1 && (
        <DialogFooter className="justify-between">
          <NotificationModalContentStatus
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
            showPageItems={false}
          />
        </DialogFooter>
      )}
    </>
  );
}
