"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { usePathname } from "@/i18n/navigation";
import { Repeat } from "@/components/common/Repeat";
import { notFound, useParams } from "next/navigation";
import { CommentList } from "../comments/CommentList";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { CommentItemWrapper } from "../comments/CommentItemWrapper";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface TaskCommentsContainerProps {
  taskId: number;
}

export function TaskCommentsContainer({ taskId }: TaskCommentsContainerProps) {
  const pathname = usePathname();
  const params = useParams();

  const { data: comments, error: commentsError } = useSWR<CommentListItemDTO[]>(
    `/api/tasks/${taskId}/comments`,
    {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    },
  );

  if (commentsError) {
    if (commentsError.status === 404) {
      if (pathname.startsWith("/tasks") && params.id) {
        notFound();
      }

      throw new Error(undefined, { cause: "taskNotFound" });
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
