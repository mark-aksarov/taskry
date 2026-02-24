import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { EditProjectFormContainer } from "@/components/projects/EditProjectFormContainer";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id: rawProjectId } = await params;

  const parsed = projectId.safeParse(rawProjectId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  const projectSummary = await getProjectSummary(id);

  if (!projectSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <ProjectDetailPage
      guestMode={guestMode}
      projectId={id}
      projectTitle={projectSummary.title}
      sendComment={sendComment}
      updateComment={updateComment}
      deleteProject={deleteProjects}
      projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
      projectHeaderContainer={<ProjectDetailHeaderContainer projectId={id} />}
      projectCommentsContainer={
        <ProjectCommentsContainer guestMode={guestMode} projectId={id} />
      }
      editProjectFormContainer={<EditProjectFormContainer projectId={id} />}
      appHeaderProps={defaultAppHeaderSlots}
    />
  );
}
