"use client";

import { ProjectList } from "./ProjectList";
import { ProjectListItem } from "./ProjectListItem";
import { BaseProjectItemProps } from "./ProjectItem";
import { ProjectItemModals } from "./ProjectItemModals";
import { ProjectItemProviders } from "./ProjectItemProviders";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { ProjectGridLarge, ProjectGridMobile } from "./ProjectGrid";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { ProjectGridItemLarge, ProjectGridItemMobile } from "./ProjectGridItem";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

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
          return (
            <ProjectItemWrapper
              key={project.id}
              project={project}
              renderItem={(props) => <ProjectListItem {...props} />}
            />
          );
        })}
      </ProjectList>
    );
  };

  const renderGridLarge = () => {
    return (
      <ProjectGridLarge>
        {projects.map((project) => {
          return (
            <ProjectItemWrapper
              key={project.id}
              project={project}
              renderItem={(props) => (
                <ProjectGridItemLarge
                  {...props}
                  tasksTotal={project.tasks.total}
                  tasksCompleted={project.tasks.completed}
                />
              )}
            />
          );
        })}
      </ProjectGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
      <ProjectGridMobile>
        {projects.map((project) => {
          return (
            <ProjectItemWrapper
              key={project.id}
              project={project}
              renderItem={(props) => (
                <ProjectGridItemMobile
                  {...props}
                  tasksTotal={project.tasks.total}
                  tasksCompleted={project.tasks.completed}
                />
              )}
            />
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

interface ProjectItemWrapperProps {
  project: ProjectListItemDTO;
  renderItem: (props: BaseProjectItemProps) => React.ReactNode;
}

function ProjectItemWrapper({ project, renderItem }: ProjectItemWrapperProps) {
  const commonProps: BaseProjectItemProps = {
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    creator: project.creator,
    status: project.status,
    commentsCount: project.commentsCount,
  };

  return (
    <ProjectItemProviders>
      {renderItem(commonProps)}
      <ProjectItemModals project={project} />
    </ProjectItemProviders>
  );
}
