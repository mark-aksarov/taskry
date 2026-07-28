import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProject } from "@/lib/data/project/project.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { ProjectDetailAltContainer } from "@/dashboard/projects/ProjectDetailAltContainer";
import { ProjectDetailCardHeaderContainer } from "@/dashboard/projects/ProjectDetailCardHeaderContainer";
import { UpdateProjectClientFormContainer } from "@/dashboard/projects/UpdateProjectClientFormContainer";
import { UpdateProjectCategoryRelFormContainer } from "@/dashboard/projects/UpdateProjectCategoryRelFormContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireFullAccess();

  // Validation
  const { id: rawProjectId } = await params;

  const parsed = projectId.safeParse(rawProjectId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get project
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailPage
      project={project}
      projectDetailCardHeaderContainer={
        <ProjectDetailCardHeaderContainer projectId={id} />
      }
      projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
      updateProjectCategoryRelFormContainer={
        <UpdateProjectCategoryRelFormContainer
          projectId={project.id}
          categoryId={project.categoryId}
        />
      }
      updateProjectClientFormContainer={
        <UpdateProjectClientFormContainer
          projectId={project.id}
          clientId={project.clientId}
        />
      }
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
