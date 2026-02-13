import "server-only";

import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectFilters } from "@/lib/types";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectGridItem } from "./ProjectGridItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { UserDetailModal } from "../users/UserDetailModal";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectList } from "@/lib/data/project/project.dal";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { ProjectItemActionMenuTrigger } from "./ProjectItemActionMenuTrigger";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface ProjectsContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: ProjectFilters;
}

export async function ProjectsContainer({
  page,
  pageSize,
  sort,
  filters,
}: ProjectsContainerProps) {
  const { items: projects, totalCount } = await getProjectList({
    page,
    pageSize,
    sort,
    filters,
  });
  const guestMode = await hasGuestRole();

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      list={
        <ProjectList showCheckbox>
          {projects.map((project) => {
            const commonProps = {
              id: project.id,
              title: project.title,
              deadline: project.deadline,
              creator: project.creator,
              status: project.status,
              commentsCount: project.commentsCount,
            };

            return (
              <ProjectListItem
                key={project.id}
                showCheckbox
                customer={project.customer}
                company={project.customer?.company}
                category={project.category}
                menuTrigger={
                  <ProjectItemActionMenuTrigger
                    guestMode={guestMode}
                    projectId={project.id}
                    projectTitle={project.title}
                    projectStatus={project.status}
                    deleteAction={deleteProjects}
                    updateStatusAction={updateProjectStatuses}
                    editProjectFormContainer={
                      <EditProjectFormContainer projectId={project.id} />
                    }
                  />
                }
                projectCommentsModal={
                  <ProjectCommentsModal
                    projectId={project.id}
                    projectCommentsContainer={
                      <ProjectCommentsContainer
                        guestMode={guestMode}
                        projectId={project.id}
                      />
                    }
                    sendCommentAction={sendComment}
                    updateCommentAction={updateComment}
                  />
                }
                projectDetailModal={
                  <ProjectDetailModal
                    projectId={project.id}
                    projectDetailContainer={
                      <ProjectDetailContainer projectId={project.id} />
                    }
                  />
                }
                userDetailModal={
                  project.creator && (
                    <UserDetailModal
                      userId={project.creator.id}
                      userDetailContainer={
                        <UserDetailContainer userId={project.creator.id} />
                      }
                    />
                  )
                }
                {...commonProps}
              />
            );
          })}
        </ProjectList>
      }
      grid={
        <ProjectGrid>
          {projects.map((project) => {
            const commonProps = {
              id: project.id,
              title: project.title,
              deadline: project.deadline,
              creator: project.creator,
              status: project.status,
              commentsCount: project.commentsCount,
            };

            return (
              <ProjectGridItem
                key={project.id}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
                menuTrigger={
                  <ProjectItemActionMenuTrigger
                    guestMode={guestMode}
                    projectId={project.id}
                    projectTitle={project.title}
                    projectStatus={project.status}
                    deleteAction={deleteProjects}
                    updateStatusAction={updateProjectStatuses}
                    editProjectFormContainer={
                      <EditProjectFormContainer projectId={project.id} />
                    }
                    className="-mr-2"
                  />
                }
                projectCommentsModal={
                  <ProjectCommentsModal
                    projectId={project.id}
                    projectCommentsContainer={
                      <ProjectCommentsContainer
                        guestMode={guestMode}
                        projectId={project.id}
                      />
                    }
                    sendCommentAction={sendComment}
                    updateCommentAction={updateComment}
                  />
                }
                projectDetailModal={
                  <ProjectDetailModal
                    projectId={project.id}
                    projectDetailContainer={
                      <ProjectDetailContainer projectId={project.id} />
                    }
                  />
                }
                userDetailModal={
                  project.creator && (
                    <UserDetailModal
                      userId={project.creator.id}
                      userDetailContainer={
                        <UserDetailContainer userId={project.creator.id} />
                      }
                    />
                  )
                }
                {...commonProps}
              />
            );
          })}
        </ProjectGrid>
      }
    />
  );
}
