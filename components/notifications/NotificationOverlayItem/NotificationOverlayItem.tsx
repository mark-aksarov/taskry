"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Link } from "@/components/ui";
import { twMerge } from "tailwind-merge";

import { Ellipsis, ListCheck, Trash } from "lucide-react";

import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  Skeleton,
} from "@/components/ui";
import { NotificationRecipientWithRelations } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { NotificationOverlayItemActor } from "./NotificationOverlayItemActor";
import { NotificationOverlayItemActionText } from "./NotificationOverlayItemActionText";
import { NotificationOverlayItemDate } from "./NotificationOverlayItemDate";
import { NotificationOverlayItemTarget } from "./NotificationOverlayItemTarget";
import { NotificationOverlayItemInfoSkeleton } from "./NotificationOverlayItemInfo";

interface NotificationOverlayItemProps {
  notification?: NotificationRecipientWithRelations;
  className?: string;
}

export const NotificationOverlayItem = ({
  notification,
  className,
}: NotificationOverlayItemProps) => {
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

  const itemClasses = "flex items-center gap-4 font-bold";

  function getActionText() {
    switch (type) {
      case "TASK_ADDED":
        return "added a new task";
      case "TASK_DELETED":
        return "deleted a task";
      case "TASK_UPDATED":
        return "updated a task";
      case "TASK_COMMENTED":
        return "commented on a task";

      case "PROJECT_ADDED":
        return "added a new project";
      case "PROJECT_DELETED":
        return "deleted a project";
      case "PROJECT_UPDATED":
        return "updated a project";
      case "PROJECT_COMMENTED":
        return "commented on a project";

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

      case "MESSAGE_SENDED":
        return "sent a";

      default:
        throw new Error("Invalid notification type");
    }
  }

  function getTarget() {
    switch (type) {
      case "TASK_ADDED":
      case "TASK_UPDATED":
      case "TASK_COMMENTED":
        return (
          <Link href={`/tasks/${target?.task?.id}`}>{target?.task?.title}</Link>
        );
      case "TASK_DELETED":
        return targetName;

      case "PROJECT_ADDED":
      case "PROJECT_UPDATED":
      case "PROJECT_COMMENTED":
        return (
          <Link href={`/projects/${target?.project?.id}`}>
            {target?.project?.title}
          </Link>
        );

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

      case "MESSAGE_SENDED":
        return <Link href={`/messages/${target?.message?.id}`}>message</Link>;

      default:
        throw new Error("Invalid notification type");
    }
  }

  return (
    <div
      className={twMerge(
        "flex w-full items-start gap-3 border-gray-300 bg-white px-4 py-3 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800",
        notification && !isRead && "bg-gray-100 dark:bg-gray-900",
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
      <div className="flex flex-col gap-1">
        {notification ? (
          <>
            <span className="inline leading-none">
              <NotificationOverlayItemActor>
                <>
                  {actor ? (
                    <Link href={`/users/${actor.id}`}>{actor.fullName}</Link>
                  ) : (
                    "Unknown User"
                  )}
                </>
              </NotificationOverlayItemActor>
              <NotificationOverlayItemActionText>
                &nbsp;{getActionText()}&nbsp;
              </NotificationOverlayItemActionText>
              <NotificationOverlayItemTarget>
                {getTarget()}
              </NotificationOverlayItemTarget>
            </span>
            <NotificationOverlayItemDate>
              {formattedUpper}
            </NotificationOverlayItemDate>
          </>
        ) : (
          <NotificationOverlayItemInfoSkeleton />
        )}
      </div>
      <div className="ml-auto">
        {notification ? (
          <ResponsiveMenuTrigger
            renderDialogHeader={() => (
              <DialogHeader className="px-4 py-3">
                <DialogHeading className="text-base">Actions</DialogHeading>
                <DialogCloseButton />
              </DialogHeader>
            )}
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
                  <div className={itemClasses}>
                    <ListCheck
                      size={16}
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />{" "}
                    Mark as Read
                  </div>
                </Item>
              )}
            </>
            <Item textValue="Delete" key="delete">
              <div className={itemClasses}>
                <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth /> Delete
              </div>
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
