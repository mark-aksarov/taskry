import { cache } from "react";
import prisma from "@/lib/prisma";
import {
  TaskFiltersForm,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
} from "../TaskFiltersForm";

const getTaskStatuses = cache(async () => {
  return prisma.taskStatus.findMany({
    select: { id: true, nameEn: true },
  });
});

const getTaskCategories = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
  });
});

const getUsers = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});

const getProjects = cache(async (workspaceId: number) => {
  return await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
    select: { id: true, title: true },
  });
});

export async function TaskFiltersFormServerContainer() {
  const statuses = await getTaskStatuses();
  const categories = await getTaskCategories(1);
  const projects = await getProjects(1);
  const users = await getUsers(1);

  return (
    <TaskFiltersForm
      assigneeCheckboxGroup={
        <TaskFiltersFormAssigneeCheckboxGroup users={users} />
      }
      categoryCheckboxGroup={
        <TaskFiltersFormCategoryCheckboxGroup categories={categories} />
      }
      projectCheckboxGroup={
        <TaskFiltersFormProjectCheckboxGroup projects={projects} />
      }
      statusCheckboxGroup={
        <TaskFiltersFormStatusCheckboxGroup
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
    />
  );
}
