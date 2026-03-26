"use client";

import { ProjectList } from "./ProjectList";
import { ProjectListItem } from "./ProjectListItem";
import { BaseProjectItemProps } from "./ProjectItem";
import { ProjectProviders } from "./ProjectProviders";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectGridLarge, ProjectGridMobile } from "./ProjectGrid";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "./UpdateProjectFormContainer";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { ProjectGridItemLarge, ProjectGridItemMobile } from "./ProjectGridItem";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";
import { CustomerDetailHeaderContainer } from "../customer/CustomerDetailHeaderContainer";

interface ProjectsDynamicProps {
  page: number;
  pageSize: number;
  totalPages: number;
  projects: ProjectListItemDTO[];
}

export function ProjectsDynamic({
  page,
  pageSize,
  projects,
  totalPages,
}: ProjectsDynamicProps) {
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

  const renderListLarge = () => {
    return (
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
            </ProjectProviders>
          );
        })}
      </ProjectList>
    );
  };

  const renderGridLarge = () => {
    return (
      <ProjectGridLarge>
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
      </ProjectGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
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
    );
  };

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridLarge={renderGridLarge}
      gridMobile={renderGridMobile}
    />
  );
}
