"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Link } from "@/components/ui";
import { LikeButton } from "../LikeButton";
import { ReplyButton } from "../ReplyButton";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText } from "./CommentItemText";
import { CommentItemInfo } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import { CommentItemLayout } from "./CommentItemLayout";
import { CommentItemContent } from "./CommentItemContent";
import { CommentItemActions } from "./CommentItemActions";
import { ImageContainer } from "@/components/common/ImageContainer";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

interface CommentItemProps {
  content: string;
  createdAt: Date;
  attachments: {
    id: number;
    fileUrl: string;
  }[];
  likes: number;
  likedByMe: boolean;
  sender?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
}

export function CommentItem({
  content,
  createdAt,
  attachments,
  likes,
  likedByMe,
  sender,
}: CommentItemProps) {
  const formattedDate = useMemo(() => {
    if (!createdAt) return null;

    return createdAt.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, [createdAt]);

  return (
    <CommentItemLayout
      senderImageSlot={
        <>
          {sender?.imageUrl ? (
            <ImageContainer className="h-9 w-9">
              <Image src={sender.imageUrl} alt={sender.fullName} fill />
            </ImageContainer>
          ) : (
            <ImageContainer className="h-9 w-9" />
          )}
        </>
      }
      senderNameAndDateSlot={
        <CommentItemInfo>
          <CommentItemTitle>
            {!sender ? (
              "Unknow user"
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
          <CommentItemActions>
            <>
              <ReplyButton />
              <LikeButton value={likes} fill={likedByMe} />
            </>
          </CommentItemActions>
        </>
      }
    />
  );
}
