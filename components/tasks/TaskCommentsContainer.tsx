"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "@/components/common/Repeat";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface TaskCommentsContainerProps {
  taskId: number;
}

export function TaskCommentsContainer({ taskId }: TaskCommentsContainerProps) {
  const { data: comments } = useSWR<CommentListItemDTO[]>(
    `/api/tasks/${taskId}/comments`,
  );

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading
  if (!comments) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  // Show empty section if no comments
  if (comments.length === 0) {
    return <CommentsEmptySection />;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            sender={comment.sender}
            canEdit={comment.canEdit}
            deleteComment={deleteComment}
          />
        );
      })}
    </>
  );
}
