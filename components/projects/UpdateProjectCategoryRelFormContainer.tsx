"use client";

import {
  UpdateProjectCategoryRelForm,
  UpdateProjectCategoryRelFormSkeleton,
} from "./UpdateProjectCategoryRelForm";

import useSWR from "swr";
import { ProjectCategorySummaryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

interface UpdateProjectCategoryRelFormContainerProps {
  projectId: number;
  categoryId?: number;
}

export function UpdateProjectCategoryRelFormContainer({
  projectId,
  categoryId,
}: UpdateProjectCategoryRelFormContainerProps) {
  const { data: categories } = useSWR<ProjectCategorySummaryDTO[]>(
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
