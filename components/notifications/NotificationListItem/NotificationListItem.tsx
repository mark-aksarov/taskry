"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Link } from "@/components/ui";
import { twMerge } from "tailwind-merge";

import { ListCheck, Trash } from "lucide-react";
import { ImageContainer } from "@/components/common/ImageContainer";
import { NotificationListItemActor } from "./NotificationListItemActor";
import { NotificationListItemActionText } from "./NotificationListItemActionText";
import { NotificationListItemDate } from "./NotificationListItemDate";
import { NotificationListItemTarget } from "./NotificationListItemTarget";
import {
  CommentItemActions,
  CommentItemContent,
  CommentItemText,
} from "@/components/comments/CommentItem";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { ReplyButton } from "@/components/comments/ReplyButton";
import { ItemBaseActionMenuTrigger } from "@/components/common/ItemBase";
import { UnknownUser } from "@/components/common/UnknownUser";

interface NotificationListItemProps {
  date: Date;
  isRead: boolean;
  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  actionText: string;
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
  date,
  isRead,
  actor,
  actionText,
  target,
  comment,
  className,
}: NotificationListItemProps) => {
  const locale = "en-GB";

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
                  "Unknown User"
                )}
              </>
            </NotificationListItemActor>
            <NotificationListItemActionText>
              &nbsp;{actionText}&nbsp;
            </NotificationListItemActionText>
            <NotificationListItemTarget>{target}</NotificationListItemTarget>
          </span>
          <NotificationListItemDate>{formattedUpper}</NotificationListItemDate>
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

      <div className="ml-auto">
        <ItemBaseActionMenuTrigger>
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
        </ItemBaseActionMenuTrigger>
      </div>
    </div>
  );
};
