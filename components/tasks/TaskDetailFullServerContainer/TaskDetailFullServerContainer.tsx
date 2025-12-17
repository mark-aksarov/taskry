import { getTaskDetail } from "@/lib/dal/task";
import { getComments } from "@/lib/dal/comments";
import { TaskDetailFull } from "../TaskDetailFull";
import { CommentItem } from "@/components/comments/CommentItem";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function TaskDetailFullServerContainer({ id }: { id: number }) {
  const task = await getTaskDetail(id);
  const comments = await getComments({
    taskId: id,
  });

  return (
    <TaskDetailFull
      description={task.description}
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
                sender={comment.sender}
              />
            );
          })}
        </div>
      }
    />
  );
}
