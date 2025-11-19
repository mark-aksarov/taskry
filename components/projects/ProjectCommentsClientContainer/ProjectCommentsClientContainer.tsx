import useSWR from "swr";
import { Repeat } from "@/components/common/Repeat";
import { GetCommentsType } from "@/lib/queries/comments";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProjectCommentsClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR<GetCommentsType>(`/api/projects/${projectId}/comments`, fetcher);

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
            likes={comment._count.likes}
            likedByMe={comment.likes.length > 0}
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
