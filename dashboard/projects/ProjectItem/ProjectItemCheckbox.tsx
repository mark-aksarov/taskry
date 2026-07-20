"use client";

import { Checkbox } from "@/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useDeleteProjects } from "../DeleteProjectsContext";

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
  const { ids } = useDeleteProjects();

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
      data-test="project-checkbox"
      data-id={id}
      aria-label={title}
      isSelected={isSelected}
      onChange={handleChange}
    />
  );
}
