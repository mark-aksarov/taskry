import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UpdateProjectModal } from "@/components/projects/UpdateProjectModal";
import { ProjectCommentsModal } from "@/components/projects/ProjectCommentsModal";
import { DeleteProjectProvider } from "@/components/projects/DeleteProjectProvider";
import { DeleteProjectDetailModal } from "@/components/projects/DeleteProjectDetailModal";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { UpdateProjectFormContainer } from "@/components/projects/UpdateProjectFormContainer";
import { UpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  // Validation
  const { id: rawProjectId } = await params;

  const parsed = projectId.safeParse(rawProjectId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get project summary
  const projectSummary = await getProjectSummary(id);

  if (!projectSummary) {
    notFound();
  }

  return (
    <DeleteProjectProvider>
      <UpdateProjectStatusProvider>
        <ProjectDetailPage
          projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
          projectHeaderContainer={
            <ProjectDetailHeaderContainer projectId={id} />
          }
        />

        <DeleteProjectDetailModal
          projectId={projectSummary.id}
          projectTitle={projectSummary.title}
        />

        <TaskSearchModal
          searchContainer={<LinkSearchContainer pathname="/tasks" />}
        />
      </UpdateProjectStatusProvider>
    </DeleteProjectProvider>
  );
}
