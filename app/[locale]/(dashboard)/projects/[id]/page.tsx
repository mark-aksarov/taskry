import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateProject } from "@/lib/actions/project/updateProject";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { UpdateProjectProvider } from "@/components/projects/UpdateProjectContext";
import { EditProjectFormContainer } from "@/components/projects/EditProjectFormContainer";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPage();

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

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateProjectProvider updateProject={updateProject}>
        <ProjectDetailPage
          projectId={id}
          projectTitle={projectSummary.title}
          sendComment={sendComment}
          updateComment={updateComment}
          deleteProject={deleteProject}
          projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
          projectHeaderContainer={
            <ProjectDetailHeaderContainer projectId={id} />
          }
          projectCommentsContainer={<ProjectCommentsContainer projectId={id} />}
          editProjectFormContainer={<EditProjectFormContainer projectId={id} />}
          appHeaderProps={defaultAppHeaderSlots}
        />
      </UpdateProjectProvider>
    </CurrentUserProvider>
  );
}
