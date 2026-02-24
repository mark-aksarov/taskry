"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { EditProjectForm } from "./EditProjectForm";
import { CalendarDate } from "@internationalized/date";
import { ProjectFormSkeleton } from "./ProjectFormSkeleton";
import { updateProject } from "@/lib/actions/project/updateProject";
import { ProjectFormDataDTO } from "@/lib/data/project/project.dto";
import { CustomerSummaryDTO } from "@/lib/data/customer/customer.dto";
import { ProjectCategorySummaryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

interface EditProjectFormContainerProps {
  projectId: number;
}

export function EditProjectFormContainer(props: EditProjectFormContainerProps) {
  return (
    <Suspense fallback={<ProjectFormSkeleton />}>
      <EditProjectFormContainerInner {...props} />
    </Suspense>
  );
}

function EditProjectFormContainerInner({
  projectId,
}: EditProjectFormContainerProps) {
  const { data: categories } = useSWR<ProjectCategorySummaryDTO[]>(
    `/api/project-categories`,
    { suspense: true },
  );

  const { data: customers } = useSWR<CustomerSummaryDTO[]>(`/api/customers`, {
    suspense: true,
  });

  const { data: project } = useSWR<ProjectFormDataDTO>(
    `/api/projects/${projectId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!categories || !customers || !project) {
    throw new Error("Project not found");
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
      updateProject={updateProject}
    />
  );
}
