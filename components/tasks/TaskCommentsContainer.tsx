"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "@/components/common/Repeat";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { CommentItemActionMenuTrigger } from "../comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function TaskCommentsContainer({ taskId }: { taskId: number }) {
  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR<CommentListItemDTO[]>(`/api/tasks/${taskId}/comments`);

  if (isLoading) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  if (!comments || comments.length === 0) {
    return <CommentsEmptySection />;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            attachments={comment.attachments}
            sender={comment.sender}
            menuTrigger={
              comment.canEdit && (
                <CommentItemActionMenuTrigger
                  commentId={comment.id}
                  commentContent={comment.content}
                  deleteAction={deleteComment}
                  mutate={mutate}
                />
              )
            }
          />
        );
      })}
    </>
  );
}
