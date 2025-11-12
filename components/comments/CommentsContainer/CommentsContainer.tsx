import useSWR from "swr";
import { CommentItem, CommentItemSkeleton } from "../CommentItem";
import { Repeat } from "@/components/common/Repeat";
import { GetCommentsByTaskType } from "@/lib/queries/comments";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CommentsContainer({ taskId }: { taskId: number }) {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR<GetCommentsByTaskType>(`/api/comments?taskId=${taskId}`, fetcher);

  if (isLoading) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  if (!comments) return null;

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
