"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Link } from "@/components/ui";
import { twMerge } from "tailwind-merge";

import { Ellipsis, ListCheck, Trash } from "lucide-react";

import { Button, Skeleton } from "@/components/ui";
import { NotificationRecipientWithRelations } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { NotificationListItemActor } from "./NotificationListItemActor";
import { NotificationListItemActionText } from "./NotificationListItemActionText";
import { NotificationListItemDate } from "./NotificationListItemDate";
import { NotificationListItemTarget } from "./NotificationListItemTarget";
import { NotificationListItemInfoSkeleton } from "./NotificationListItemInfo";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import {
  CommentItemActions,
  CommentItemContent,
  CommentItemText,
} from "@/components/comments/CommentItem";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { ReplyButton } from "@/components/comments/ReplyButton";
import { LikeButton } from "@/components/comments/LikeButton";

interface NotificationListItemProps {
  notification?: NotificationRecipientWithRelations;
  className?: string;
}

export const NotificationListItem = ({
  notification,
  className,
}: NotificationListItemProps) => {
  const locale = "en-GB";

  const isRead = notification?.isRead;
  const date = notification?.notification?.createdAt;
  const type = notification?.notification?.type;
  const target = notification?.notification?.target;
  const targetName = notification?.notification?.targetName;
  const actor = notification?.notification?.actor;

  const formattedDate = useMemo(() => {
    if (!date) return "";

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, [date, locale]);

  const formattedUpper = formattedDate.replace(/([ap]m)$/i, (match) =>
    match.toUpperCase(),
  );

  function getActionText() {
    switch (type) {
      case "TASK_ADDED":
        return "added a new task";
      case "TASK_DELETED":
        return "deleted a task";
      case "TASK_UPDATED":
        return "updated a task";

      case "PROJECT_ADDED":
        return "added a new project";
      case "PROJECT_DELETED":
        return "deleted a project";
      case "PROJECT_UPDATED":
        return "updated a project";

      case "USER_ADDED":
        return "added a new user";
      case "USER_DELETED":
        return "deleted a user";
      case "USER_UPDATED":
        return "updated a user";

      case "CUSTOMER_ADDED":
        return "added a new customer";
      case "CUSTOMER_DELETED":
        return "deleted a customer";
      case "CUSTOMER_UPDATED":
        return "updated a customer";

      case "COMMENT_REPLIED":
        return "replied to a comment in";
      case "COMMENT_ADDED":
        return "added a comment to";
      case "MESSAGE_SENT":
        return "sent a";

      default:
        throw new Error("Invalid notification type");
    }
  }

  function getTarget() {
    switch (type) {
      case "TASK_ADDED":
      case "TASK_UPDATED":
      case "TASK_DELETED":
        return targetName;

      case "PROJECT_ADDED":
      case "PROJECT_UPDATED":
      case "PROJECT_DELETED":
        return targetName;

      case "USER_ADDED":
      case "USER_UPDATED":
        return (
          <Link href={`/users/${target?.user?.id}`}>
            {target?.user?.fullName}
          </Link>
        );
      case "USER_DELETED":
        return targetName;

      case "CUSTOMER_ADDED":
      case "CUSTOMER_UPDATED":
        return (
          <Link href={`/customers/${target?.customer?.id}`}>
            {target?.customer?.fullName}
          </Link>
        );
      case "CUSTOMER_DELETED":
        return targetName;

      case "COMMENT_REPLIED": {
        const comment = target?.comment!;
        return (
          <Link
            href={`/${comment.project ? "projects" : "tasks"}?commentId=${comment.id}`}
          >
            {comment.project ? comment.project.title : comment.task!.title}
          </Link>
        );
      }
      case "COMMENT_ADDED": {
        const comment = target?.comment!;
        return (
          <Link
            href={`/${comment.project ? "projects" : "tasks"}?commentId=${comment.id}`}
          >
            {comment.project ? comment.project.title : comment.task!.title}
          </Link>
        );
      }
      case "MESSAGE_SENT":
        return "sent a";

      default:
        throw new Error("Invalid notification type");
    }
  }

  return (
    <div
      className={twMerge(
        "flex items-start gap-3 border-gray-300 bg-white p-4 pr-2 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800",
        notification && !isRead && "bg-gray-100/70 dark:bg-gray-700/70",
        className,
      )}
    >
      {!notification ? (
        <ImageContainerSkeleton className="h-10 w-10" />
      ) : actor?.imageUrl ? (
        <Link href={`/users/${actor.id}`}>
          <ImageContainer className="h-10 w-10">
            <Image fill src={actor.imageUrl} alt={actor.fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-10 w-10" />
      )}
      {!notification ? (
        <NotificationListItemInfoSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="inline leading-none">
              <NotificationListItemActor>
                <>
                  {actor ? (
                    <Link href={`/users/${actor.id}`}>{actor.fullName}</Link>
                  ) : (
                    "Unknown User"
                  )}
                </>
              </NotificationListItemActor>
              <NotificationListItemActionText>
                &nbsp;{getActionText()}&nbsp;
              </NotificationListItemActionText>
              <NotificationListItemTarget>
                {getTarget()}
              </NotificationListItemTarget>
            </span>
            <NotificationListItemDate>
              {formattedUpper}
            </NotificationListItemDate>
          </div>

          {type === "COMMENT_REPLIED" ||
            (type === "COMMENT_ADDED" && (
              <CommentItemContent className="ml-0">
                <CommentItemText>{target!.comment!.content}</CommentItemText>
                {target!.comment!.attachments.length > 0 && (
                  <Attachments>
                    {target!.comment!.attachments.map((attachment) => (
                      <Attachment key={attachment.id}>
                        <Image
                          src={attachment.fileUrl}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </Attachment>
                    ))}
                  </Attachments>
                )}
                <CommentItemActions>
                  <ReplyButton />
                  <LikeButton
                    value={target!.comment!._count.likes}
                    fill={target!.comment!.likes.length > 0}
                  />
                </CommentItemActions>
              </CommentItemContent>
            ))}
        </div>
      )}
      <div className="ml-auto">
        {notification ? (
          <ResponsiveMenuTrigger
            renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
            renderButton={() => (
              <Button
                aria-label="task item menu"
                variant="ghost"
                iconLeft={
                  <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
                className="shrink-0 grow-0 rounded-full"
              />
            )}
          >
            <>
              {!isRead && (
                <Item textValue="Mark as Read" key="read">
                  <ListCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
                  Mark as Read
                </Item>
              )}
            </>
            <Item textValue="Delete" key="delete">
              <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth /> Delete
            </Item>
          </ResponsiveMenuTrigger>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center">
            <Skeleton className="h-1 w-4" />
          </div>
        )}
      </div>
    </div>
  );
};
