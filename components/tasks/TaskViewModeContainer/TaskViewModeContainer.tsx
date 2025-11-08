import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { getTasks } from "@/lib/queries/task";

export async function TaskViewModeContainer() {
  const tasks = await getTasks();

  return (
    <ViewModeContainer
      list={<TaskList tasks={tasks} />}
      grid={<TaskGrid tasks={tasks} />}
    />
  );
}
