"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "./SelectedProjectsContext";

interface ProjectItemCheckboxProps {
  id: number;
  status: ProjectStatus;
}

export function ProjectItemCheckbox({ id, status }: ProjectItemCheckboxProps) {
  const selected = useSelectedProjects();

  // Sync status with project selection
  useEffect(() => {
    selected.update(id, { id, status });
  }, [id, status, selected.update]);

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
      data-test="project-checkbox"
      data-id={id}
      aria-label="project checkbox"
      isSelected={isSelected}
      onChange={handleChange}
    />
  );
}
