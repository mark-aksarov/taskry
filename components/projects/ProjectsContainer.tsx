import "server-only";

import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectGridItem } from "./ProjectGridItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
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
          <ProjectList>
            {projects.map((project) => {
              return (
                <ProjectListItem
                  guestMode={guestMode}
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  deadline={project.deadline}
                  creator={project.creator}
                  status={project.status}
                  commentsCount={project.commentsCount}
                  customer={project.customer}
                  company={project.customer?.company}
                  category={project.category}
                  editProjectFormContainer={
                    <EditProjectFormContainer projectId={project.id} />
                  }
                  projectCommentsContainer={
                    <ProjectCommentsContainer
                      guestMode={guestMode}
                      projectId={project.id}
                    />
                  }
                  projectDetailContainer={
                    <ProjectDetailContainer projectId={project.id} />
                  }
                  userDetailContainer={
                    project.creator && (
                      <UserDetailContainer userId={project.creator.id} />
                    )
                  }
                  customerDetailContainer={
                    project.customer && (
                      <CustomerDetailContainer
                        customerId={project.customer.id}
                      />
                    )
                  }
                  sendComment={sendComment}
                  updateComment={updateComment}
                  updateProjectStatus={updateProjectStatuses}
                />
              );
            })}
          </ProjectList>
        }
        grid={
          <ProjectGrid>
            {projects.map((project) => {
              return (
                <ProjectGridItem
                  guestMode={guestMode}
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  deadline={project.deadline}
                  creator={project.creator}
                  status={project.status}
                  commentsCount={project.commentsCount}
                  tasksTotal={project.tasks.total}
                  tasksCompleted={project.tasks.completed}
                  editProjectFormContainer={
                    <EditProjectFormContainer projectId={project.id} />
                  }
                  projectCommentsContainer={
                    <ProjectCommentsContainer
                      guestMode={guestMode}
                      projectId={project.id}
                    />
                  }
                  projectDetailContainer={
                    <ProjectDetailContainer projectId={project.id} />
                  }
                  userDetailContainer={
                    project.creator && (
                      <UserDetailContainer userId={project.creator.id} />
                    )
                  }
                  sendComment={sendComment}
                  updateComment={updateComment}
                  updateProjectStatus={updateProjectStatuses}
                />
              );
            })}
          </ProjectGrid>
        }
      />
    </DeleteProjectModalProvider>
  );
}
