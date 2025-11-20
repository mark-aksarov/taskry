import { TaskDetailFull } from "../TaskDetailFull";
import { getTaskDetail } from "@/lib/queries/task";
import { getComments } from "@/lib/queries/comments";
import { CommentItem } from "@/components/comments/CommentItem";
import { TaskDetailFullComments } from "../TaskDetailFull/TaskDetailFullComments";

export async function TaskDetailFullServerContainer({ id }: { id: number }) {
  const task = await getTaskDetail(id);
  const comments = await getComments({
    taskId: id,
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  });

  return (
    <TaskDetailFull
      description={task.description ?? undefined}
      subtasks={task.subtasks}
      attachments={task.attachments}
      comments={
        <TaskDetailFullComments>
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
        </TaskDetailFullComments>
      }
    />
  );
}
