"use client";

import {
  CommentItemText,
  CommentItemActions,
  CommentItemContent,
} from "@/components/comments/CommentItem";

import Image from "next/image";
import { Item } from "react-stately";
import { Link } from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { ListCheck, Trash } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ReplyButton } from "@/components/comments/ReplyButton";
import { ImageContainer } from "@/components/common/ImageContainer";
import { NotificationListItemDate } from "./NotificationListItemDate";
import { NotificationListItemActor } from "./NotificationListItemActor";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { NotificationListItemTarget } from "./NotificationListItemTarget";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { NotificationListItemActionText } from "./NotificationListItemActionText";

export interface NotificationListItemProps {
  date: Date;
  isRead: boolean;
  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  type: string;
  target: React.ReactNode;
  comment?: {
    content: string;
    attachments: {
      id: number;
      fileUrl: string;
      fileName: string;
    }[];
  };
  className?: string;
}

export const notificationListItemStyles =
  "flex items-start gap-3 border-gray-300 bg-white p-4 pr-2 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800";

export const NotificationListItem = ({
  isRead,
  actor,
  target,
  comment,
  className,
  date,
  type,
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
      {!actor || !actor.imageUrl ? (
        <UnknownUser className="h-10 w-10" iconSize={22} />
      ) : (
        <Link href={`/users/${actor.id}`}>
          <ImageContainer className="h-10 w-10">
            <Image fill src={actor.imageUrl} alt={actor.fullName} />
          </ImageContainer>
        </Link>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="inline leading-none">
            <NotificationListItemActor>
              <>
                {actor ? (
                  <Link href={`/users/${actor.id}`}>{actor.fullName}</Link>
                ) : (
                  t("unknownUser")
                )}
              </>
            </NotificationListItemActor>
            <NotificationListItemActionText>
              &nbsp;{t(`action.${type}`)}&nbsp;
            </NotificationListItemActionText>
            <NotificationListItemTarget>{target}</NotificationListItemTarget>
          </span>
          <NotificationListItemDate>{formattedDate}</NotificationListItemDate>
        </div>

        {comment && (
          <CommentItemContent className="ml-0">
            <CommentItemText>{comment.content}</CommentItemText>
            {comment.attachments.length > 0 && (
              <Attachments>
                {comment.attachments.map((attachment) => (
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
            </CommentItemActions>
          </CommentItemContent>
        )}
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
