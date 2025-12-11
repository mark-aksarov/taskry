import useSWR from "swr";
import { GetCommentsType } from "@/lib/queries/comments";
import { CommentItem } from "@/components/comments/CommentItem";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

export function ProjectCommentsClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const { data: comments } = useSWR<GetCommentsType>(
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
            sender={
              comment.sender
                ? {
                    id: comment.sender.id,
                    fullName: comment.sender.fullName,
                    imageUrl: comment.sender.imageUrl ?? undefined,
                  }
                : undefined
            }
          />
        );
      })}
    </>
  );
}
