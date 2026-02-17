"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Suspense } from "react";
import { Repeat } from "../common/Repeat";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { CommentItemActionMenuTrigger } from "../comments/CommentItem";
import { DeleteCommentModalProvider } from "../comments/DeleteCommentModal";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface ProjectCommentsContainerProps {
  guestMode: boolean;
  projectId: number;
}

export function ProjectCommentsContainer(props: ProjectCommentsContainerProps) {
  return (
    <Suspense
      fallback={
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
      }
    >
      <ProjectCommentsContainerInner {...props} />
    </Suspense>
  );
}

function ProjectCommentsContainerInner({
  guestMode,
  projectId,
}: ProjectCommentsContainerProps) {
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

  return (
    <DeleteCommentModalProvider deleteEntity={deleteComment} mutate={mutate}>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            sender={comment.sender}
            menuTrigger={
              (comment.canEdit || guestMode) && (
                <CommentItemActionMenuTrigger
                  guestMode={guestMode}
                  commentId={comment.id}
                  commentContent={comment.content}
                />
              )
            }
          />
        );
      })}
    </DeleteCommentModalProvider>
  );
}
