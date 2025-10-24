import { getTask } from "@/lib/queries/task";
import { TaskDetailPanelHeaderInner } from "./TaskDetailPanelHeaderInner";

export async function TaskDetailPanelHeader({ id }: { id: number }) {
  const task = await getTask(id);

  return <TaskDetailPanelHeaderInner task={task} />;
}
