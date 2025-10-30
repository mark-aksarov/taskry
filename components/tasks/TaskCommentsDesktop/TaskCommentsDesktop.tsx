import { CommentList } from "@/components/comments/CommentList";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
} from "@/components/common/EmptySection";
import { getCommentsByTask } from "@/lib/queries/comments";

export async function TaskCommentsDesktop({ taskId }: { taskId: number }) {
  const comments = await getCommentsByTask(
    taskId,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  if (!comments.length) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No comments yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Start the conversation by adding your first comment
          </EmptySectionDescription>
        </EmptySection>
      </div>
    );
  }

  return (
    <>
      <CommentList comments={comments} />
    </>
  );
}
