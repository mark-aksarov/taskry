"use client";

import {
  NotificationModalContent,
  NotificationModalContentStatus,
} from "../NotificationModalContent";

import useSWR from "swr";
import { useState } from "react";
import { NotificationList } from "../NotificationList";
import { Pagination } from "@/components/common/Pagination";
import { NotificationListItem } from "../NotificationListItem";
import { DialogBody, DialogFooter, Link } from "@/components/ui";
import { NotificationsDTO } from "@/lib/data/notification/notification.dto";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

function getTarget(notification: NotificationsDTO["items"][number]) {
  const { type, target, targetName } = notification;
  switch (type) {
    case "taskAdded":
    case "taskUpdated":
      return (
        <Link className="inline" href={`/users/${target?.task?.id}`}>
          {target?.task?.title}
        </Link>
      );
    case "taskDeleted":
      return targetName;

    case "projectAdded":
    case "projectUpdated":
      return (
        <Link className="inline" href={`/users/${target?.project?.id}`}>
          {target?.project?.title}
        </Link>
      );
    case "projectDeleted":
      return targetName;

    case "userAdded":
    case "userUpdated":
      return (
        <Link className="inline" href={`/users/${target?.user?.id}`}>
          {target?.user?.fullName}
        </Link>
      );
    case "userDeleted":
      return targetName;

    case "customerAdded":
    case "customerUpdated":
      return (
        <Link className="inline" href={`/customers/${target?.customer?.id}`}>
          {target?.customer?.fullName}
        </Link>
      );
    case "customerDeleted":
      return targetName;

    case "commentReplied": {
      const comment = target?.comment!;
      return (
        <Link
          className="inline"
          href={`/${comment.project ? "projects" : "tasks"}?commentId=${comment.id}`}
        >
          {comment.project ? comment.project.title : comment.task!.title}
        </Link>
      );
    }
    case "commentAdded": {
      const comment = target?.comment!;
      return (
        <Link
          className="inline"
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

function getComment(notification: any) {
  const { target } = notification;

  if (target?.comment) {
    return {
      id: target.comment.id,
      content: target.comment.content,
      attachments: target.comment.attachments.map((attachment: any) => ({
        id: attachment.id,
        fileUrl: attachment.fileUrl,
        fileName: attachment.fileName,
      })),
    };
  }

  return undefined;
}

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
            {items.map((notification) => (
              <NotificationListItem
                key={notification.id}
                isRead={notification.isRead}
                actor={notification.actor}
                date={notification.createdAt}
                type={notification.type}
                target={getTarget(notification)}
                comment={getComment(notification)}
              />
            ))}
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
