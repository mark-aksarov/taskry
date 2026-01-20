"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "../common/Repeat";
import { useHasGuestMode } from "@/lib/hooks/useHasGuestMode";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { CommentItemActionMenuTrigger } from "../comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function ProjectCommentsContainer({ projectId }: { projectId: number }) {
  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR<CommentListItemDTO[]>(`/api/projects/${projectId}/comments`, {
    suspense: true,
  });

  if (isLoading) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  if (!comments || comments.length === 0) {
    return <CommentsEmptySection />;
  }

  const guestMode = useHasGuestMode();

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
                  guestMode={guestMode}
                  commentId={comment.id}
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
