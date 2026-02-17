import "server-only";

import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectGridItem } from "./ProjectGridItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { UserDetailModal } from "../users/UserDetailModal";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { CustomerDetailModal } from "../customer/CustomerDetailModal";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { ProjectItemActionMenuTrigger } from "./ProjectItemActionMenuTrigger";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";
import { DeleteProjectModalProvider } from "./DeleteProjectModal/DeleteProjectModalContext";

interface ProjectsContainerProps {
  projects: ProjectListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function ProjectsContainer({
  projects,
  totalCount,
  page,
  pageSize,
}: ProjectsContainerProps) {
  const guestMode = await hasGuestRole();

  return (
    <DeleteProjectModalProvider deleteEntity={deleteProjects}>
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
                  updateProjectStatus={updateProjectStatuses}
                  menuTrigger={
                    <ProjectItemActionMenuTrigger
                      guestMode={guestMode}
                      projectId={project.id}
                      projectTitle={project.title}
                      projectStatus={project.status}
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
                  customerDetailModal={
                    project.customer && (
                      <CustomerDetailModal
                        customerId={project.customer.id}
                        customerDetailContainer={
                          <CustomerDetailContainer
                            customerId={project.customer.id}
                          />
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
                  updateProjectStatus={updateProjectStatuses}
                  menuTrigger={
                    <ProjectItemActionMenuTrigger
                      guestMode={guestMode}
                      projectId={project.id}
                      projectTitle={project.title}
                      projectStatus={project.status}
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
    </DeleteProjectModalProvider>
  );
}
