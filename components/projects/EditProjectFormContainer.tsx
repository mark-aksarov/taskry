"use client";

import useSWR from "swr";
import { EditProjectForm } from "./EditProjectForm";
import { CalendarDate } from "@internationalized/date";
import { ProjectFormSkeleton } from "./ProjectFormSkeleton";
import { ProjectFormDataDTO } from "@/lib/data/project/project.dto";
import { CustomerSummaryDTO } from "@/lib/data/customer/customer.dto";
import { ProjectCategorySummaryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

interface EditProjectFormContainerProps {
  projectId: number;
}

export function EditProjectFormContainer({
  projectId,
}: EditProjectFormContainerProps) {
  const { data: categories } = useSWR<ProjectCategorySummaryDTO[]>(
    `/api/project-categories`,
    {
      revalidateIfStale: false, // don't revalidate on each mount
      revalidateOnFocus: false,
    },
  );

  const { data: customers } = useSWR<CustomerSummaryDTO[]>(`/api/customers`, {
    revalidateIfStale: false, // don't revalidate on each mount
    revalidateOnFocus: false,
  });

  // Current project data for editing (loaded each modal open)
  const { data: project, isValidating: isValidatingProject } =
    useSWR<ProjectFormDataDTO>(`/api/projects/${projectId}?view=edit`);

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading or revalidating
  const showSkeleton =
    !categories || !customers || !project || isValidatingProject;

  if (showSkeleton) {
    return <ProjectFormSkeleton />;
  }

  const d = new Date(project.deadline);
  const dateValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <EditProjectForm
      projectId={projectId}
      projectTitleDefaultValue={project.title}
      projectDescriptionDefaultValue={project.description}
      projectDeadlineDefaultValue={dateValue}
      projectStatusDefaultValue={project.status}
      projectCategorySelectDefaultValue={
        project.categoryId ? project.categoryId.toString() : ""
      }
      projectCustomerSelectDefaultValue={
        project.customerId ? project.customerId.toString() : ""
      }
      projectCategorySelectItems={categories}
      projectCustomerSelectItems={customers}
    />
  );
}
