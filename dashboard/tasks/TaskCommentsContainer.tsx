"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/dashboard/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "@/common/Repeat";
import { CommentList } from "../comments/CommentList";
import { useHasGuestRole } from "@/lib/hooks/useHasGuestRole";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { CommentItemWrapper } from "../comments/CommentItemWrapper";
import { CommentsEmptySection } from "@/dashboard/comments/CommentsEmptySection";

interface TaskCommentsContainerProps {
  taskId: number;
}

export function TaskCommentsContainer({ taskId }: TaskCommentsContainerProps) {
  const { data: comments, error: commentsError } = useSWR<CommentListItemDTO[]>(
    `/api/tasks/${taskId}/comments`,
    {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    },
  );

  if (commentsError) {
    throw new Error();
  }

  const { isGuest, isPending } = useHasGuestRole();

  // Show skeleton while loading
  if (!comments || isPending) {
    return (
      <CommentList>
        <Repeat items={5} renderItem={() => <CommentItemSkeleton />} />
      </CommentList>
    );
  }

  // Show empty section if no comments
  if (comments.length === 0) {
    return <CommentsEmptySection />;
  }

  return (
    <CommentList>
      {comments.map((comment) => {
        return (
          <CommentItemWrapper key={comment.id} commentId={comment.id}>
            <CommentItem
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              sender={comment.sender}
              canEdit={comment.canEdit}
              isGuest={isGuest}
            />
          </CommentItemWrapper>
        );
      })}
    </CommentList>
  );
}
