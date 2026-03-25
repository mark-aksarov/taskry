import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectProviders } from "@/components/projects/ProjectProviders";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { UpdateProjectFormContainer } from "@/components/projects/UpdateProjectFormContainer";
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
    <ProjectProviders>
      <ProjectDetailPage
        projectId={id}
        projectTitle={projectSummary.title}
        sendComment={sendComment}
        updateComment={updateComment}
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
        projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
        projectHeaderContainer={<ProjectDetailHeaderContainer projectId={id} />}
        projectCommentsContainer={<ProjectCommentsContainer projectId={id} />}
        updateProjectFormContainer={
          <UpdateProjectFormContainer projectId={id} />
        }
      />
    </ProjectProviders>
  );
}
