"server only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { NewTaskForm } from "./NewTaskForm";
import { NewTaskFormStatusSelect } from "./NewTaskFormStatusSelect";
import { NewTaskFormCategorySelect } from "./NewTaskFormCategorySelect";
import { NewTaskFormProjectSelect } from "./NewTaskFormProjectSelect";
import { NewTaskFormAssigneeSelect } from "./NewTaskFormAssigneeSelect";

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

const getProjects = cache(async (workspaceId: number) => {
  return await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
    select: { id: true, title: true },
  });
});

const getUsers = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});

export async function NewTaskFormContainer() {
  const statuses = await getTaskStatuses();
  const categories = await getTaskCategories(1);
  const projects = await getProjects(1);
  const users = await getUsers(1);

  return (
    <NewTaskForm
      taskStatusSelect={
        <NewTaskFormStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
      taskCategorySelect={
        <NewTaskFormCategorySelect
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      }
      projectSelect={
        <NewTaskFormProjectSelect
          projects={projects.map((p) => ({ id: p.id, title: p.title }))}
        />
      }
      assigneeSelect={
        <NewTaskFormAssigneeSelect
          users={users.map((u) => ({ id: u.id, fullName: u.fullName }))}
        />
      }
    />
  );
}
