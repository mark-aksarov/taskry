"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "../SelectedProjectsContext";

interface ProjectItemCheckboxProps {
  id: number;
  status: ProjectStatus;
}

export function ProjectItemCheckbox({ id, status }: ProjectItemCheckboxProps) {
  const selected = useSelectedProjects();

  function handleChange(isSelected: boolean) {
    if (isSelected) {
      selected.add({ id, status });
    } else {
      selected.remove(id);
    }
  }

  return (
    <Checkbox
      data-test="project-checkbox"
      data-id={id}
      aria-label="project checkbox"
      isSelected={selected.items.some((item) => item.id === id)}
      onChange={handleChange}
    />
  );
}
