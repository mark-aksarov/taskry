import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { CommentDTO } from "@/lib/dto/comments";
import { Repeat } from "@/components/common/Repeat";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function TaskCommentsClientContainer({ taskId }: { taskId: number }) {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR<CommentDTO[]>(`/api/tasks/${taskId}/comments`);

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
