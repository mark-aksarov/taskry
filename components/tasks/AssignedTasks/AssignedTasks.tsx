import { getTasks } from "@/lib/queries/task";
import { TaskList } from "../TaskList";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";

export async function AssignedTasks() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return <AssignedTasksEmptyCard />;
  }

  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      <TaskList tasks={tasks} showCheckbox={false} />
    </AssignedTasksSection>
  );
}
