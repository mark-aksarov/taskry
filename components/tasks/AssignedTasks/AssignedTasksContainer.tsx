import { getTasks } from "@/lib/queries/task";
import { AssignedTasks } from "./AssignedTasks";
import { AssignedTasksEmpty } from "./AssignedTasksEmpty";

export async function AssignedTasksContainer() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return <AssignedTasksEmpty />;
  }

  return <AssignedTasks tasks={tasks} />;
}
