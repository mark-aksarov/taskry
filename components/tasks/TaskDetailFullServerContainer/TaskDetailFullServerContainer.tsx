import { TaskDetailFull } from "../TaskDetailFull";
import { getTaskDetail } from "@/lib/data/task";
import { getComments } from "@/lib/data/comments";
import { CommentItem } from "@/components/comments/CommentItem";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function TaskDetailFullServerContainer({ id }: { id: number }) {
  const task = await getTaskDetail(id);
  const comments = await getComments({
    taskId: id,
  });

  return (
    <TaskDetailFull
      description={task.description ?? undefined}
      subtasks={task.subtasks}
      attachments={task.attachments}
      comments={
        <div className="flex flex-col gap-4">
          <DetailCommentInput />
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
        </div>
      }
    />
  );
}
