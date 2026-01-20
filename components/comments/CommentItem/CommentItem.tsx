"use client";

import Image from "next/image";
import { Link } from "@/components/ui";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText } from "./CommentItemText";
import { CommentItemInfo } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import { CommentItemLayout } from "./CommentItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

interface CommentItemProps {
  content: string;
  createdAt: Date;
  attachments: {
    id: number;
    fileUrl: string;
  }[];
  sender?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  menuTrigger?: React.ReactNode;
}

export function CommentItem({
  content,
  createdAt,
  attachments,
  sender,
  menuTrigger,
}: CommentItemProps) {
  const t = useTranslations("comments.CommentItem");

  const format = useFormatter();

  const formattedDate = format.dateTime(new Date(createdAt), {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <CommentItemLayout
      senderImageSlot={
        <>
          {sender?.imageUrl ? (
            <ImageContainer className="h-9 w-9">
              <Image src={sender.imageUrl} alt={sender.fullName} fill />
            </ImageContainer>
          ) : (
            <UnknownUser className="h-9 w-9" />
          )}
        </>
      }
      senderNameAndDateSlot={
        <CommentItemInfo>
          <CommentItemTitle>
            {!sender ? (
              t("unknownUser")
            ) : (
              <Link href={`/users/${sender.id}`}>{sender.fullName}</Link>
            )}
          </CommentItemTitle>
          <CommentItemDate>{formattedDate}</CommentItemDate>
        </CommentItemInfo>
      }
      contentSlot={
        <>
          <CommentItemText>{content}</CommentItemText>
          {attachments.length > 0 && (
            <Attachments>
              {attachments.map((attachment) => (
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
        </>
      }
      menuTriggerSlot={menuTrigger}
    />
  );
}
