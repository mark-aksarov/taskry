import { CommentList } from "@/components/comments/CommentList";
import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { getCommentsByTask } from "@/lib/queries/comments";

export async function TaskComments({ taskId }: { taskId: number }) {
  const comments = await getCommentsByTask(
    taskId,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  if (!comments.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No comments yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Start the conversation by adding your first comment
          </EmptySectionDescription>
          <EmptySectionLink href="#">Add Comment</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <>
      <CommentList comments={comments} />
    </>
  );
}
