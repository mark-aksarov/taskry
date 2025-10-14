"use client";

import Image from "next/image";
import { Card } from "@/components/common/Card";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText, CommentItemTextSkeleton } from "./CommentItemText";
import { CommentItemInfo, CommentItemInfoSkeleton } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import {
  CommentItemImageContainer,
  CommentItemImageContainerSkeleton,
} from "./CommentItemImageContainer";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  CommentItemActionMenuDialogHeader,
  commentItemActionMenuItemStyles,
  CommentItemActionMenuSkeleton,
} from "./CommentItemActionMenu";
import { Button } from "@/components/ui";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Item } from "react-stately";
import { Comment } from "@/lib/queries/types";
import { useMemo } from "react";

export function CommentItem({ comment }: { comment?: Comment }) {
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
    <Card className="flex w-full flex-col gap-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!comment ? (
            <CommentItemImageContainerSkeleton />
          ) : comment.sender?.imageUrl ? (
            <CommentItemImageContainer>
              <Image
                src={comment.sender.imageUrl}
                alt={comment.sender.fullName}
                fill
              />
            </CommentItemImageContainer>
          ) : (
            <CommentItemImageContainer />
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
        {!comment ? (
          <CommentItemActionMenuSkeleton />
        ) : (
          <ResponsiveMenuTrigger
            placement="bottom right"
            renderDialogHeader={() => <CommentItemActionMenuDialogHeader />}
            renderButton={() => (
              <Button
                aria-label="project menu"
                variant="ghost"
                iconLeft={
                  <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
                className="rounded-full"
              />
            )}
          >
            <Item textValue="Edit" key="delete">
              <div className={commentItemActionMenuItemStyles}>
                <Pencil size={16} /> Edit
              </div>
            </Item>
            <Item textValue="Delete" key="delete">
              <div className={commentItemActionMenuItemStyles}>
                <Trash size={16} /> Delete
              </div>
            </Item>
          </ResponsiveMenuTrigger>
        )}
      </div>

      {!comment ? (
        <CommentItemTextSkeleton />
      ) : (
        <CommentItemText>{comment.content}</CommentItemText>
      )}
    </Card>
  );
}
