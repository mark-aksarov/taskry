"use client";

import useSWR from "swr";
import { usePathname } from "@/i18n/navigation";
import { EditProjectForm } from "./EditProjectForm";
import { notFound, useParams } from "next/navigation";
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
  const pathname = usePathname();
  const params = useParams();

  const { data: categories } = useSWR<ProjectCategorySummaryDTO[]>(
    `/api/project-categories`,
    {
      revalidateOnFocus: false,
    },
  );

  const { data: customers } = useSWR<CustomerSummaryDTO[]>(`/api/customers`, {
    revalidateOnFocus: false,
  });

  const {
    data: project,
    isValidating: isValidatingProject,
    error: projectError,
  } = useSWR<ProjectFormDataDTO>(`/api/projects/${projectId}?view=edit`, {
    revalidateOnFocus: false,
  });

  if (projectError) {
    if (projectError.status === 404) {
      if (pathname.startsWith("/projects") && params.id) {
        notFound();
      }

      throw new Error(undefined, { cause: "projectNotFound" });
    }

    throw new Error();
  }

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
