"use client";

import { Checkbox } from "@/ui/Checkbox";
import { TaskStatus } from "@/generated/prisma/enums";
import { useDeleteTasks } from "../DeleteTasksContext";
import { useSelectedTasks } from "../SelectedTasksContext";

interface TaskItemCheckboxProps {
  id: number;
  title: string;
  status: TaskStatus;
}

export function TaskItemCheckbox({ id, title, status }: TaskItemCheckboxProps) {
  const selected = useSelectedTasks();
  const { ids } = useDeleteTasks();

  function handleChange(isSelected: boolean) {
    if (isSelected) {
      selected.add({ id, status });
    } else {
      selected.remove(id);
    }
  }

  const isSelected = !!selected.get(id) || ids.includes(id);

  return (
    <Checkbox
      data-test="task-checkbox"
      data-id={id}
      aria-label={title}
      isSelected={isSelected}
      onChange={handleChange}
      className="items-start"
    />
  );
}
