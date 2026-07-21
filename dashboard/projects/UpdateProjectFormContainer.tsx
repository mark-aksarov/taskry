"use client";

import useSWR from "swr";
import { UpdateProjectForm } from "./UpdateProjectForm";
import { ProjectFormSkeleton } from "./ProjectFormSkeleton";
import { ProjectDTO } from "@/lib/data/project/project.dto";
import { CustomerSummaryDTO } from "@/lib/data/customer/customer.dto";
import { ProjectCategoryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

interface UpdateProjectFormContainerProps {
  projectId: number;
}

export function UpdateProjectFormContainer({
  projectId,
}: UpdateProjectFormContainerProps) {
  const { data: categories } = useSWR<ProjectCategoryDTO[]>(
    `/api/project-categories`,
  );

  const { data: customers } = useSWR<CustomerSummaryDTO[]>(`/api/customers`);

  const {
    data: project,
    error: projectError,
    isValidating,
  } = useSWR<ProjectDTO>(`/api/projects/${projectId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (projectError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !categories || !customers || !project || isValidating;

  if (showSkeleton) {
    return <ProjectFormSkeleton />;
  }

  return (
    <UpdateProjectForm
      projectId={projectId}
      title={project.title}
      description={project.description}
      deadline={project.deadline}
      status={project.status}
      categoryId={project.categoryId}
      customerId={project.customerId}
      projectCategorySelectItems={categories}
      customerSelectItems={customers}
    />
  );
}
