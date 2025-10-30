import { getSubtasksByTask } from "@/lib/queries/task";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { SubtaskList } from "@/components/subtasks/SubtaskList";

export async function TaskSubtasksDesktop({ taskId }: { taskId: number }) {
  const subtasks = await getSubtasksByTask(taskId);

  if (!subtasks.length) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No subtasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new subtask to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Subtask</EmptySectionLink>
        </EmptySection>
      </div>
    );
  }

  return (
    <>
      <SubtaskList subtasks={subtasks} />
    </>
  );
}
