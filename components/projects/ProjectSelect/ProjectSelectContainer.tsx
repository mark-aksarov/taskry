import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectSelect } from "./ProjectSelect";

const getProjects = cache(async (workspaceId: number) => {
  return await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
    select: { id: true, title: true },
  });
});

export async function ProjectSelectContainer() {
  const projects = await getProjects(1);

  if (!projects.length) {
    return null;
  }

  return <ProjectSelect projects={projects} />;
}
