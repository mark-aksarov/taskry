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
import { Link } from "@/components/ui";
import { Card } from "@/components/common/Card";

interface CommentItemProps {
  comment?: Comment;
  renderActions?: () => React.ReactNode;
}

export function CommentItem({ comment, renderActions }: CommentItemProps) {
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

  return (
    <Card className="flex w-full flex-col gap-4 border-gray-300 max-md:rounded-xl md:rounded-none md:px-0 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
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
            {renderActions && renderActions()}
          </>
        )}
      </CommentItemContent>
    </Card>
  );
}
