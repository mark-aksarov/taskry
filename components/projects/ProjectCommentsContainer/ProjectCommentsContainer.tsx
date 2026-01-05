import useSWR from "swr";
import { CommentItem } from "@/components/comments/CommentItem";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function ProjectCommentsContainer({ projectId }: { projectId: number }) {
  const { data: comments } = useSWR<CommentListItemDTO[]>(
    `/api/projects/${projectId}/comments`,
    {
      suspense: true,
    },
  );

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
