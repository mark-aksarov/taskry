"use client";

import {
  UpdateProjectCategoryRelForm,
  UpdateProjectCategoryRelFormSkeleton,
} from "./UpdateProjectCategoryRelForm";

import useSWR from "swr";
import { ProjectCategoryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

interface UpdateProjectCategoryRelFormContainerProps {
  projectId: number;
  categoryId?: number;
}

export function UpdateProjectCategoryRelFormContainer({
  projectId,
  categoryId,
}: UpdateProjectCategoryRelFormContainerProps) {
  const { data: categories } = useSWR<ProjectCategoryDTO[]>(
    "/api/project-categories",
  );

  // Show skeleton while loading
  if (!categories) {
    return <UpdateProjectCategoryRelFormSkeleton />;
  }

  return (
    <UpdateProjectCategoryRelForm
      projectId={projectId}
      categoryId={categoryId}
      projectCategorySelectItems={categories}
    />
  );
}
