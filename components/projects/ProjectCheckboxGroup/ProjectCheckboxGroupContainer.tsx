import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectCheckboxGroup } from "./ProjectCheckboxGroup";

const getProjects = cache(async (workspaceId: number) => {
  return await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
    select: { id: true, title: true },
  });
});

export async function ProjectCheckboxGroupContainer() {
  const projects = await getProjects(1);

  if (!projects.length) {
    return null;
  }

  return <ProjectCheckboxGroup projects={projects} />;
}
