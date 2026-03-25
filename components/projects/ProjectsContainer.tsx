import "server-only";

import { ProjectList } from "./ProjectList";
import { ProjectGridMobile } from "./ProjectGrid";
import { TaskGridLarge } from "../tasks/TaskGrid";
import { ProjectListItem } from "./ProjectListItem";
import { BaseProjectItemProps } from "./ProjectItem";
import { ProjectProviders } from "./ProjectProviders";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "./UpdateProjectFormContainer";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
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

    updateProjectFormContainer: (
      <UpdateProjectFormContainer projectId={project.id} />
    ),
    projectCommentsContainer: (
      <ProjectCommentsContainer projectId={project.id} />
    ),

    sendComment,
    updateComment,
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
              <ProjectProviders key={project.id}>
                <ProjectListItem
                  {...common}
                  {...details}
                  customer={project.customer}
                  company={project.customer?.company}
                  category={project.category}
                  customerDetailContainer={
                    project.customer ? (
                      <CustomerDetailContainer
                        customerId={project.customer.id}
                      />
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
              </ProjectProviders>
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
              <ProjectProviders key={project.id}>
                <ProjectGridItemLarge
                  {...common}
                  {...details}
                  tasksTotal={project.tasks.total}
                  tasksCompleted={project.tasks.completed}
                />
              </ProjectProviders>
            );
          })}
        </TaskGridLarge>
      }
      gridMobile={
        <ProjectGridMobile>
          {projects.map((project) => {
            const common = getCommonProps(project);

            return (
              <ProjectProviders key={project.id}>
                <ProjectGridItemMobile
                  {...common}
                  tasksTotal={project.tasks.total}
                  tasksCompleted={project.tasks.completed}
                />
              </ProjectProviders>
            );
          })}
        </ProjectGridMobile>
      }
    />
  );
}
