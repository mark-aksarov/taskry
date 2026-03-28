"use client";

import { ProjectList } from "./ProjectList";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectItemWrapper } from "./ProjectItemWrapper";
import { ProjectGridLarge, ProjectGridMobile } from "./ProjectGrid";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
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
  const renderListLarge = () => {
    return (
      <ProjectList>
        {projects.map((project) => {
          return (
            <ProjectItemWrapper key={project.id} project={project}>
              <ProjectListItem {...project} />
            </ProjectItemWrapper>
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
            <ProjectItemWrapper key={project.id} project={project}>
              <ProjectGridItemLarge
                {...project}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
              />
            </ProjectItemWrapper>
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
            <ProjectItemWrapper key={project.id} project={project}>
              <ProjectGridItemMobile
                {...project}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
              />
            </ProjectItemWrapper>
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
