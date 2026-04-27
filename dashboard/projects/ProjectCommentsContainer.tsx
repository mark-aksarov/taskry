"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/dashboard/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "@/common/Repeat";
import { CommentList } from "../comments/CommentList";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { CommentItemWrapper } from "../comments/CommentItemWrapper";
import { CommentsEmptySection } from "@/dashboard/comments/CommentsEmptySection";

interface ProjectCommentsContainerProps {
  projectId: number;
}

export function ProjectCommentsContainer({
  projectId,
}: ProjectCommentsContainerProps) {
  const { data: comments, error } = useSWR<CommentListItemDTO[]>(
    `/api/projects/${projectId}/comments`,
    {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    },
  );

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!comments) {
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
            />
          </CommentItemWrapper>
        );
      })}
    </CommentList>
  );
}
