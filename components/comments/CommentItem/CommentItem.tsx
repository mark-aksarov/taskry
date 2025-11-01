"use client";

import Image from "next/image";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText, CommentItemTextSkeleton } from "./CommentItemText";
import { CommentItemInfo, CommentItemInfoSkeleton } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { Comment } from "@/lib/queries/types";
import { useMemo } from "react";
import { CommentItemContent } from "./CommentItemContent";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { Link, Skeleton } from "@/components/ui";
import { CommentItemActions } from "./CommentItemActions";
import { CommentButton } from "../CommentButton";
import { Heart, Reply } from "lucide-react";

interface CommentItemProps {
  comment?: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const formattedDate = useMemo(() => {
    if (!comment) return null;

    return comment.createdAt.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, [comment]);

  const isLiked = comment ? comment.likes.length > 0 : false;

  return (
    <div className="flex flex-col gap-4 border-gray-300 not-last:border-b-1 not-last:pb-4 dark:border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!comment ? (
            <ImageContainerSkeleton className="h-9 w-9" />
          ) : comment.sender?.imageUrl ? (
            <ImageContainer className="h-9 w-9">
              <Image
                src={comment.sender.imageUrl}
                alt={comment.sender.fullName}
                fill
              />
            </ImageContainer>
          ) : (
            <ImageContainer className="h-9 w-9" />
          )}

          {!comment ? (
            <CommentItemInfoSkeleton />
          ) : (
            <CommentItemInfo>
              <CommentItemTitle>
                <Link href={`/users/${comment.sender.id}`}>
                  {comment.sender.fullName}
                </Link>
              </CommentItemTitle>
              <CommentItemDate>{formattedDate}</CommentItemDate>
            </CommentItemInfo>
          )}
        </div>
      </div>

      <CommentItemContent>
        {!comment ? (
          <CommentItemTextSkeleton />
        ) : (
          <>
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
              {!comment ? (
                <>
                  <Skeleton className="h-[1rem] w-[3.5rem]" />
                  <Skeleton className="h-[1rem] w-[2.25rem]" />
                </>
              ) : (
                <>
                  <CommentButton
                    icon={
                      <Reply size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    }
                    label="Reply"
                  />
                  <CommentButton
                    icon={
                      <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    }
                    label={comment._count.likes}
                    aria-label="Like comment"
                    color={isLiked ? "red" : "default"}
                    fill={isLiked}
                  />
                </>
              )}
            </CommentItemActions>
          </>
        )}
      </CommentItemContent>
    </div>
  );
}
