import { getTasks } from "@/lib/queries/task";
import { ProfileTaskList } from "../ProfileTaskList";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";

export async function ProfileTasksDesktop() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No tasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionButton href="#">New Task</EmptySectionButton>
        </EmptySection>
      </div>
    );
  }

  return <ProfileTaskList />;
}
