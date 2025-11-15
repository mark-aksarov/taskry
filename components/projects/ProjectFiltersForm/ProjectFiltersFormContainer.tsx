"server only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectFiltersForm } from "./ProjectFiltersForm";
import { ProjectFiltersFormUserCheckboxGroup } from "./ProjectFiltersFormUserCheckboxGroup";
import { ProjectFiltersFormCategoryCheckboxGroup } from "./ProjectFiltersFormCategoryCheckboxGroup";
import { ProjectFiltersFormCustomerCheckboxGroup } from "./ProjectFiltersFormCustomerCheckboxGroup";
import { ProjectFiltersFormStatusCheckboxGroup } from "./ProjectFiltersFormStatusCheckboxGroup";

export const getCustomers = cache(async (workspaceId: number) => {
  return await prisma.customer.findMany({
    where: {
      company: {
        workspaceId,
      },
    },
    select: {
      id: true,
      fullName: true,
    },
  });
});

export const getProjectCategories = cache(async (workspaceId: number) => {
  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

const getUsers = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});

export const getProjectStatuses = cache(async () => {
  return await prisma.projectStatus.findMany({
    select: { id: true, nameEn: true },
  });
});

export async function ProjectFiltersFormContainer() {
  const categories = await getProjectCategories(1);
  const customers = await getCustomers(1);
  const users = await getUsers(1);
  const statuses = await getProjectStatuses();

  return (
    <ProjectFiltersForm
      projectStatusCheckboxGroup={
        <ProjectFiltersFormStatusCheckboxGroup
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
      userCheckboxGroup={<ProjectFiltersFormUserCheckboxGroup users={users} />}
      projectCategoryCheckboxGroup={
        <ProjectFiltersFormCategoryCheckboxGroup categories={categories} />
      }
      customerCheckboxGroup={
        <ProjectFiltersFormCustomerCheckboxGroup customers={customers} />
      }
    />
  );
}
