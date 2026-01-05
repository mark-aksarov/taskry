import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "@/components/common/Repeat";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function TaskCommentsContainer({ taskId }: { taskId: number }) {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR<CommentListItemDTO[]>(`/api/tasks/${taskId}/comments`);

  if (isLoading) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  if (!comments) return null;

  if (comments.length === 0) {
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
          />
        );
      })}
    </>
  );
}
