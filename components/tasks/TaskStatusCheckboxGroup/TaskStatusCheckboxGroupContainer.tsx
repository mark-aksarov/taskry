import { getTaskStatuses } from "@/lib/queries/task";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";

export async function TaskStatusCheckboxGroupContainer() {
  const statuses = await getTaskStatuses();

  if (!statuses.length) {
    return null;
  }

  return (
    <TaskStatusCheckboxGroup
      statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
    />
  );
}
