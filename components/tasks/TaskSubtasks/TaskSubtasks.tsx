import { getSubtasksByTask } from "@/lib/queries/task";
import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { SubtaskList } from "@/components/subtasks/SubtaskList";

export async function TaskSubtasks({ taskId }: { taskId: number }) {
  const subtasks = await getSubtasksByTask(taskId);

  if (!subtasks.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No subtasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new subtask to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Subtask</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <>
      <SubtaskList subtasks={subtasks} />
    </>
  );
}
