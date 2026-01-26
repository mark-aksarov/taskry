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
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface ProjectCommentsContainerProps {
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
