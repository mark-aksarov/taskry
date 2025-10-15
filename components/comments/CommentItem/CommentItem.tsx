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

interface CommentItemProps {
  comment?: Comment;
  renderActions: () => React.ReactNode;
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
    <>
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
              <CommentItemTitle>{comment.sender.fullName}</CommentItemTitle>
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
            {renderActions()}
          </>
        )}
      </CommentItemContent>
    </>
  );
}
