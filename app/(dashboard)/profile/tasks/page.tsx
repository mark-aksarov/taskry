import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { TaskList } from "@/components/tasks/TaskList";
import { getTasks } from "@/lib/queries/task";

export default async function ProfileTasksPage() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No tasks yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Task</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return <TaskList tasks={tasks} showCheckbox={false} />;
}
