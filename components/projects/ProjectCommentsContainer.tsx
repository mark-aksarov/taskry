"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "../common/Repeat";
import { usePathname } from "@/i18n/navigation";
import { notFound, useParams } from "next/navigation";
import { CommentList } from "../comments/CommentList";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { DeleteCommentModal } from "../comments/DeleteCommentModal";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { CommentItemWrapper } from "../comments/CommentItemWrapper";

interface ProjectCommentsContainerProps {
  projectId: number;
}

export function ProjectCommentsContainer({
  projectId,
}: ProjectCommentsContainerProps) {
  const pathname = usePathname();
  const params = useParams();

  const { data: comments, error: commentsError } = useSWR<CommentListItemDTO[]>(
    `/api/projects/${projectId}/comments`,
    {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    },
  );

  if (commentsError) {
    if (commentsError.status === 404) {
      if (pathname.startsWith("/projects") && params.id) {
        notFound();
      }

      throw new Error(undefined, { cause: "projectNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading
  if (!comments) {
    return (
      <CommentList>
        <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
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
