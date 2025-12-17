import useSWR from "swr";
import { CommentDTO } from "@/lib/dto/comments";
import { CommentItem } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function ProjectCommentsClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const { data: comments } = useSWR<CommentDTO[]>(
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
