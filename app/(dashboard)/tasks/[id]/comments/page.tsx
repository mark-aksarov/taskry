import { CommentList } from "@/components/comments/CommentList";
import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { TaskCommentsMessageInput } from "@/components/tasks/TaskCommentsMessageInput";
import { getCommentsByTask } from "@/lib/queries/comments";

export default async function TaskCommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comments = await getCommentsByTask(
    +id,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  if (!comments.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No comments yet</EmptySectionHeading>
          <EmptySectionDescription>
            Start the conversation by adding your first comment
          </EmptySectionDescription>
          <EmptySectionLink href="#">Add Comment</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TaskCommentsMessageInput />
      <CommentList comments={comments} />
    </div>
  );
}
