"use client";

import {
  UpdateTaskProjectForm,
  UpdateTaskProjectFormSkeleton,
} from "./UpdateTaskProjectForm";

import useSWR from "swr";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";

interface UpdateTaskProjectFormContainerProps {
  taskId: number;
  projectId?: number;
}

export function UpdateTaskProjectFormContainer({
  taskId,
  projectId,
}: UpdateTaskProjectFormContainerProps) {
  const { data: projects } = useSWR<ProjectSummaryDTO[]>("/api/projects");

  // Show skeleton while loading
  if (!projects) {
    return <UpdateTaskProjectFormSkeleton />;
  }

  return (
    <UpdateTaskProjectForm
      taskId={taskId}
      projectId={projectId}
      projectSelectItems={projects}
    />
  );
}
