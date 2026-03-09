"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { usePathname } from "@/i18n/navigation";
import { Repeat } from "@/components/common/Repeat";
import { notFound, useParams } from "next/navigation";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
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

  // Show skeleton while loading or revalidating
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
