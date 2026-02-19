import { notFound } from "next/navigation";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { SearchModal } from "@/components/search/SearchModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";
import { ProjectCommentsModal } from "@/components/projects/ProjectCommentsModal";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";
import { EditProjectFormContainer } from "@/components/projects/EditProjectFormContainer";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;
  const numberId = Number(id);

  const projectSummary = await getProjectSummary(numberId);

  if (!projectSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <ProjectDetailPage
      projectDetailContainer={
        <ProjectDetailAltContainer projectId={Number(id)} />
      }
      projectHeaderContainer={
        <ProjectDetailHeaderContainer projectId={Number(id)} />
      }
      projectDetailActions={
        <ProjectDetailActions
          guestMode={guestMode}
          deleteProject={deleteProjects}
          editProjectFormContainer={
            <EditProjectFormContainer projectId={numberId} />
          }
          projectId={numberId}
          projectTitle={projectSummary.title}
          commentsModal={
            <ProjectCommentsModal
              projectId={numberId}
              projectCommentsContainer={
                <ProjectCommentsContainer
                  guestMode={guestMode}
                  projectId={numberId}
                />
              }
              sendCommentAction={sendComment}
              updateCommentAction={updateComment}
            />
          }
        />
      }
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    />
  );
}
