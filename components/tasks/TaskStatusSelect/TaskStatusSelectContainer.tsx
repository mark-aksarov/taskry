import { getTaskStatuses } from "@/lib/queries/task";
import { TaskStatusSelect } from "./TaskStatusSelect";

export async function TaskStatusSelectContainer() {
  const statuses = await getTaskStatuses();

  if (!statuses.length) {
    return null;
  }

  return (
    <TaskStatusSelect
      statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
    />
  );
}
