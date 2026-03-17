import "server-only";

import { ProjectList } from "./ProjectList";
import { ProjectGridMobile } from "./ProjectGrid";
import { TaskGridLarge } from "../tasks/TaskGrid";
import { ProjectListItem } from "./ProjectListItem";
import { BaseProjectItemProps } from "./ProjectItem";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { updateProject } from "@/lib/actions/project/updateProject";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { ProjectGridItemLarge, ProjectGridItemMobile } from "./ProjectGridItem";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";
import { CustomerDetailHeaderContainer } from "../customer/CustomerDetailHeaderContainer";

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
  const getCommonProps = (
    project: ProjectListItemDTO,
  ): BaseProjectItemProps => ({
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    creator: project.creator,
    status: project.status,
    commentsCount: project.commentsCount,

    editProjectFormContainer: (
      <EditProjectFormContainer projectId={project.id} />
    ),
    projectCommentsContainer: (
      <ProjectCommentsContainer projectId={project.id} />
    ),

    sendComment,
    updateComment,
    updateProject,
    deleteProject,
    updateProjectStatus,
  });

  const getCommonContainerProps = (project: ProjectListItemDTO) => ({
    userDetailContainer: project.creator ? (
      <UserDetailContainer userId={project.creator.id} />
    ) : undefined,

    userDetailHeaderContainer: project.creator ? (
      <UserDetailHeaderContainer userId={project.creator.id} />
    ) : undefined,

    projectDetailContainer: <ProjectDetailContainer projectId={project.id} />,
  });

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      listLarge={
        <ProjectList>
          {projects.map((project) => {
            const common = getCommonProps(project);
            const details = getCommonContainerProps(project);

            return (
              <ProjectListItem
                key={project.id}
                {...common}
                {...details}
                customer={project.customer}
                company={project.customer?.company}
                category={project.category}
                customerDetailContainer={
                  project.customer ? (
                    <CustomerDetailContainer customerId={project.customer.id} />
                  ) : undefined
                }
                customerDetailHeaderContainer={
                  project.customer ? (
                    <CustomerDetailHeaderContainer
                      customerId={project.customer.id}
                    />
                  ) : undefined
                }
              />
            );
          })}
        </ProjectList>
      }
      gridLarge={
        <TaskGridLarge>
          {projects.map((project) => {
            const common = getCommonProps(project);
            const details = getCommonContainerProps(project);

            return (
              <ProjectGridItemLarge
                key={project.id}
                {...common}
                {...details}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
              />
            );
          })}
        </TaskGridLarge>
      }
      gridMobile={
        <ProjectGridMobile>
          {projects.map((project) => {
            const common = getCommonProps(project);

            return (
              <ProjectGridItemMobile
                key={project.id}
                {...common}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
              />
            );
          })}
        </ProjectGridMobile>
      }
    />
  );
}
