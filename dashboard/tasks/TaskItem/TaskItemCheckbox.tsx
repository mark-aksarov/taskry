"use client";

import { Checkbox } from "@/ui/Checkbox";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSelectedTasks } from "../SelectedTasksContext/SelectedTasksContext";

interface TaskItemCheckboxProps {
  id: number;
  status: TaskStatus;
}

export function TaskItemCheckbox({ id, status }: TaskItemCheckboxProps) {
  const selected = useSelectedTasks();

  function handleChange(isSelected: boolean) {
    if (isSelected) {
      selected.add({ id, status });
    } else {
      selected.remove(id);
    }
  }

  const isSelected = !!selected.get(id);

  return (
    <Checkbox
      data-test="task-checkbox"
      data-id={id}
      aria-label="task checkbox"
      isSelected={isSelected}
      onChange={handleChange}
      className="items-start"
    />
  );
}
