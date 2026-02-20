import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";
import { ProjectCommentsModal } from "@/components/projects/ProjectCommentsModal";
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
      projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
      projectHeaderContainer={<ProjectDetailHeaderContainer projectId={id} />}
      projectDetailActions={
        <ProjectDetailActions
          guestMode={guestMode}
          deleteProject={deleteProjects}
          editProjectFormContainer={<EditProjectFormContainer projectId={id} />}
          projectId={id}
          projectTitle={projectSummary.title}
          commentsModal={
            <ProjectCommentsModal
              projectId={id}
              projectCommentsContainer={
                <ProjectCommentsContainer
                  guestMode={guestMode}
                  projectId={id}
                />
              }
              sendCommentAction={sendComment}
              updateCommentAction={updateComment}
            />
          }
        />
      }
      appHeaderProps={defaultAppHeaderSlots}
    />
  );
}
