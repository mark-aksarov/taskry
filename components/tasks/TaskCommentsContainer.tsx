"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Suspense } from "react";
import { Repeat } from "@/components/common/Repeat";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { DeleteCommentModalProvider } from "../comments/DeleteCommentModal";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface TaskCommentsContainerProps {
  guestMode: boolean;
  taskId: number;
}

export function TaskCommentsContainer(props: TaskCommentsContainerProps) {
  return (
    <Suspense
      fallback={
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      }
    >
      <TaskCommentsContainerInner {...props} />
    </Suspense>
  );
}

function TaskCommentsContainerInner({
  guestMode,
  taskId,
}: TaskCommentsContainerProps) {
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
    <DeleteCommentModalProvider deleteEntity={deleteComment} mutate={mutate}>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            sender={comment.sender}
            canEdit={comment.canEdit}
            guestMode={guestMode}
          />
        );
      })}
    </DeleteCommentModalProvider>
  );
}
