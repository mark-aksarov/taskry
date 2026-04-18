import { useTaskItemPending } from "./TaskItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { SelectableItem } from "../common/SelectableItem";
import { useSelectedTasks } from "./SelectedTasksContext";

interface SelectableTaskItemProps {
  taskId: number;
  taskStatus: TaskStatus;
  children: React.ReactNode;
}

export function SelectableTaskItem({
  taskId,
  taskStatus,
  children,
}: SelectableTaskItemProps) {
  const selected = useSelectedTasks();
  const isPending = useTaskItemPending(taskId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: taskId, status: taskStatus }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
