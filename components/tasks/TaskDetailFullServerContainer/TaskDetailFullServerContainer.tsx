import { notFound } from "next/navigation";
import { TaskDetailFull } from "../TaskDetailFull";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { CommentItem } from "@/components/comments/CommentItem";
import { getCommentList } from "@/lib/data/comment/comment.service";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function TaskDetailFullServerContainer({ id }: { id: number }) {
  const task = await getTaskDetail(id);
  const comments = await getCommentList({
    taskId: id,
  });

  if (!task) {
    notFound();
  }

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
