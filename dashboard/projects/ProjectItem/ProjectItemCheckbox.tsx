"use client";

import { Checkbox } from "@/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "../SelectedProjectsContext";

interface ProjectItemCheckboxProps {
  id: number;
  title: string;
  status: ProjectStatus;
}

export function ProjectItemCheckbox({
  id,
  title,
  status,
}: ProjectItemCheckboxProps) {
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
      aria-label={title}
      isSelected={selected.items.some((item) => item.id === id)}
      onChange={handleChange}
    />
  );
}
